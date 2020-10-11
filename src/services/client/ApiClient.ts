import { ApiErrorName, ApiResponse } from './api'
import { HttpError, NetworkError } from 'services/errors'
import { MixedDispatch } from 'store/types'
import { authenticate, unauthenticate } from 'store/user'
import { connectStoreDispatch } from 'store/connect-store'
import Endpoints from 'config/endpoints'
import ky, { Input, NormalizedOptions, Options } from 'ky'

const base = 'abc'

export default class ApiClient {
  @connectStoreDispatch()
  private dispatch!: MixedDispatch

  private readonly client: typeof ky

  /**
   * Promise that requests token endpoint
   * Used to prevent multiple calls to token endpoint
   */
  private tokenUpdateRequest: Promise<void> | null = null
  /**
   * Stores whether the first request to token endpoint
   * has been performed. Needed to prevent useless requests to token
   * endpoint for unauthenticated user
   */
  private initialized = false

  /**
   * Access token expiration date
   */
  private tokenExpires: number | null = null
  /**
   * Access token
   */
  private token: string | null = null

  constructor() {
    this.beforeRequest = this.beforeRequest.bind(this)
    this.afterResponse = this.afterResponse.bind(this)

    this.client = ky.create({
      prefixUrl: base,
      hooks: {
        beforeRequest: [this.beforeRequest],
        afterResponse: [this.afterResponse],
      },
    })
  }

  /**
   * Performs GET HTTP request
   */
  public get<Response>(url: Input, options?: Options) {
    return this.request<Response>('get', url, options)
  }

  /**
   * Performs PUT HTTP request
   */
  public put<Response>(url: Input, options?: Options) {
    return this.request<Response>('put', url, options)
  }

  /**
   * Performs POST HTTP request
   */
  public post<Response>(url: Input, options?: Options) {
    return this.request<Response>('post', url, options)
  }

  /**
   * Performs HEAD HTTP request
   */
  public head<Response>(url: Input, options?: Options) {
    return this.request<Response>('head', url, options)
  }

  /**
   * Performs PATCH HTTP request
   */
  public patch<Response>(url: Input, options?: Options) {
    return this.request<Response>('patch', url, options)
  }

  /**
   * Performs DELETE HTTP request
   */
  public delete<Response>(url: Input, options?: Options) {
    return this.request<Response>('delete', url, options)
  }

  // TODO: maybe move to utilities
  /**
   * Decodes base 64 preserving unicode characters
   * @param str Base 64 encoded string
   */
  private base64decode(str: string) {
    return decodeURIComponent(escape(atob(str)))
  }

  /**
   * Returns amount of milliseconds that represent the time,
   * when the token will expire
   * @param token Access token
   */
  private getTokenExpirationTime(token: string): number {
    try {
      const seconds: number = +JSON.parse(
        this.base64decode(token.split('.')[1]),
      ).exp
      return seconds * 1000
    } catch (e) {
      return 0
    }
  }

  /**
   * Performs an HTTP request. This method exists to
   * generalize logic for different methods
   * @param method HTTP method
   * @param url
   * @param options
   */
  private async request<Response>(
    method: 'get' | 'put' | 'post' | 'head' | 'patch' | 'delete',
    url: Input,
    options?: Options,
  ) {
    return this.client[method](url, options)
      .json<ApiResponse.Success<Response>>()
      .catch((e) => {
        if (e.message === 'Timeout' || e.message === 'Network request failed') {
          throw new NetworkError()
        }
        throw e
      })
  }

  /**
   * Fetches or returns cache access token
   */
  private async getAccessToken(): Promise<string | null> {
    if (this.tokenUpdateRequest) {
      await this.tokenUpdateRequest
    } else if (
      !this.initialized ||
      (this.tokenExpires && this.tokenExpires < Date.now())
    ) {
      this.initialized = true

      await (this.tokenUpdateRequest = this.updateToken())
      this.tokenUpdateRequest = null
    }

    return this.token
  }

  /**
   * Fetches a new access token and caches it
   */
  private async updateToken(): Promise<void> {
    try {
      const { data } = await this.get<ApiResponse.Auth.TokenResponse>(
        Endpoints.Auth.token,
      )

      this.token = data.token
      this.tokenExpires = this.getTokenExpirationTime(data.token)

      this.dispatch(
        authenticate({
          providers: data.providers,
          username: data.username,
          email: data.email,
          id: data.id,
        }),
      )
    } catch (e: unknown) {
      if (
        e instanceof HttpError &&
        (await e.getApiName()) === ApiErrorName.UNAUTHORIZED
      ) {
        this.token = this.tokenExpires = null
      }
      this.dispatch(unauthenticate())
    }
  }

  /**
   * Hook that fires before every requests and authenticates
   * it if `authenticate` option is set
   */
  private async beforeRequest(req: Request, options: NormalizedOptions) {
    if (options.authenticate) {
      const token = await this.getAccessToken()

      if (token) {
        req.headers.set('Authorization', `Bearer ${token}`)
      }
    }
  }

  /**
   * Hook that fires for every response and transforms
   * ky HTTPError to custom HttpError with data
   * about request, response and options
   */
  private async afterResponse(
    req: Request,
    options: NormalizedOptions,
    res: Response,
  ) {
    if (!res.ok) {
      throw new HttpError(req, res, options)
    }
  }
}
