import { Endpoints } from 'config/endpoints'
import { HTTPError, NetworkError, UnknownError } from 'services/errors'
import { REACT_APP_YM_ID } from 'config'
import { ServerResponse } from 'response-types'
import { sendRequestErrorLog } from 'services/errors/handle-request-error'
import ky, { Input, NormalizedOptions, Options } from 'ky'

declare var gtag: Gtag.Gtag
declare const ym: ym.Event

export type User = {
  id: string
  name: string
  email: string
  providers: string[]
}

type GetTokenResponse =
  | ServerResponse<'unauthenticated'>
  | ServerResponse<
      'ok',
      {
        providers: string[]
        check: string
        token: string
        email: string
        name: string
        id: string
      }
    >
type Credentials =
  | null
  | (User & {
      accessToken: string
      expirationTime: number
    })

export type AuthEvent = CustomEvent<User | null>
declare class EventTarget {
  addEventListener(name: 'appdata', cb: (event: CustomEvent) => unknown): void

  addEventListener(
    name: 'authenticate',
    cb: (event: CustomEvent) => unknown,
  ): void

  removeEventListener(
    name: 'authenticate',
    cb: (event: AuthEvent) => unknown,
  ): void

  dispatchEvent(event: AuthEvent /* | AppDataEvent */): boolean
}
const CHECK_KEY = 'auth-check'

class Client extends EventTarget {
  private _credentials: Credentials = null
  private pendingRequest: Promise<Credentials> | null = null
  private client: typeof ky
  private fetched = false
  private _check: string | null = null

  public get check() {
    return (
      this._check || (this._check = localStorage.getItem(CHECK_KEY) || null)
    )
  }

  public set check(check: string | null) {
    this._check = check

    if (check) localStorage.setItem(CHECK_KEY, check)
    else localStorage.removeItem(CHECK_KEY)
  }

  private static base64decode(token: string) {
    return decodeURIComponent(escape(atob(token)))
  }

  constructor(base: string) {
    super()
    this.beforeRequest = this.beforeRequest.bind(this)
    this.afterResponse = this.afterResponse.bind(this)

    this.client = ky.create({
      prefixUrl: base,
      hooks: {
        beforeRequest: [this.beforeRequest],
        afterResponse: [this.afterResponse],
      },
    })
    // @ts-ignore
    window.ky = this.client
  }

  public async init() {
    await this.getCredentials()
    return this.getUser()
  }

  public getToken() {
    return this._credentials?.accessToken || null
  }

  public get<TResponse>(url: Input, options?: Options | undefined) {
    return this.req<TResponse>('get', url, options)
  }

  public put<TResponse>(url: Input, options?: Options | undefined) {
    return this.req<TResponse>('put', url, options)
  }

  public post<TResponse>(url: Input, options?: Options | undefined) {
    return this.req<TResponse>('post', url, options)
  }

  public head<TResponse>(url: Input, options?: Options | undefined) {
    return this.req<TResponse>('head', url, options)
  }

  public patch<TResponse>(url: Input, options?: Options | undefined) {
    return this.req<TResponse>('patch', url, options)
  }

  public delete<TResponse>(url: Input, options?: Options | undefined) {
    return this.req<TResponse>('delete', url, options)
  }

  private async req<TResponse>(
    method: 'get' | 'put' | 'post' | 'head' | 'patch' | 'delete',
    url: Input,
    options?: Options,
  ): Promise<TResponse> {
    try {
      // await is needed for try to redirect to catch
      const response = await this.client[method](url, options).json<TResponse>()
      return response
    } catch (e) {
      // TODO: check for timeout errors
      throw e.name === 'TypeError' ? new NetworkError() : e
    }
  }

  public async isAuthenticated() {
    const credentials = await this.getCredentials()
    return credentials !== null
  }

  public setCredentials(response: GetTokenResponse) {
    if (response.status === 'unauthenticated') {
      this._credentials = null
      this.check = null
      this.dispatchEvent(new CustomEvent('authenticate', { detail: null }))
    } else {
      const {
        data: { check, providers, token, email, name, id },
      } = response
      const expirationTime = this.getExpirationTime(token)
      this.check = check

      this._credentials = {
        accessToken: token,
        expirationTime,
        providers,
        email,
        name,
        id,
      }

      gtag('set', { user_id: id })
      ym(REACT_APP_YM_ID, 'setUserID', id)

      this.dispatchEvent(
        new CustomEvent('authenticate', {
          detail: { providers, email, name, id },
        }),
      )
    }
  }

  public async getUser(): Promise<User | null> {
    const credentials = await this.getCredentials()
    return (
      credentials && {
        providers: credentials.providers,
        email: credentials.email,
        name: credentials.name,
        id: credentials.id,
      }
    )
  }

  private getExpirationTime(token: string): number {
    try {
      return JSON.parse(Client.base64decode(token.split('.')[1])).exp
    } catch (e) {
      throw new UnknownError()
    }
  }

  private async getCredentials() {
    if (!this._credentials && this.fetched) {
      return null
    }
    if (
      this._credentials &&
      this._credentials.expirationTime - Date.now() / 1000 > 100
    ) {
      return this._credentials
    }

    if (this.pendingRequest) {
      return this.pendingRequest
    }

    const promise = this.fetchCredentials()
    // pendingRequest may not be rejected, this breaks logic
    // inside beforeRequest authentication hook
    this.pendingRequest = promise.catch(() => null)

    const credentials = await promise
    this.fetched = true
    this.pendingRequest = null
    return credentials
  }

  private async fetchCredentials() {
    const check = this.check
    if (!check) {
      const response: GetTokenResponse = {
        status: 'unauthenticated',
        data: null,
      }
      this.setCredentials(response)
    } else {
      try {
        const response: GetTokenResponse = await this.post(
          Endpoints.Auth.getToken,
          {
            mode: 'cors',
            credentials: 'include',
            json: { check },
          },
        )
        this.setCredentials(response)
      } catch (e) {
        if (e instanceof HTTPError) {
          sendRequestErrorLog(e)
        }
        throw e
      }
    }

    return this._credentials
  }

  private async beforeRequest(req: Request, options: NormalizedOptions) {
    if (!options.authenticate) return

    const credentials = await this.getCredentials()
    if (credentials) {
      req.headers.set('Authorization', `Bearer ${credentials.accessToken}`)
    } else if (options.authenticate !== 'optionally') {
      return new Response(null, {
        status: 401,
        statusText: 'Unauthorized',
      })
    }
  }

  private async afterResponse(req: Request, options: Options, res: Response) {
    res._req = req
    res._opts = options
    return res
  }
}

const ApiClient = new Client(process.env.REACT_APP_API_URL || '')
export default ApiClient
