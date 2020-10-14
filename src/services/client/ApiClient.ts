import { ApiErrorName, ApiResponse } from './api'
import { HttpError, NetworkError } from 'services/errors'
import { StoreController } from 'store'
import { UserState, authenticate, unauthenticate } from 'store/user'
import { connectStore } from 'store/connect-store'
import { getTokenExpirationTime } from 'util/jwt'
import { notifyError } from 'store/view'
import Config from 'config'
import Endpoint from 'config/endpoint'
import ky, { Input, NormalizedOptions, Options } from 'ky'

/**
 * Manages all network requests and authenticated
 * them when needed
 */
export default class ApiClient extends StoreController {
  @connectStore((state) => state.user)
  private readonly user!: UserState

  /** Http client */
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

  constructor() {
    super()

    this.beforeRequest = this.beforeRequest.bind(this)
    this.afterResponse = this.afterResponse.bind(this)

    this.client = ky.create({
      prefixUrl: Config.API_URL,
      hooks: {
        beforeRequest: [this.beforeRequest],
        afterResponse: [this.afterResponse],
      },
    })

    // Token is not fetched in the constructor, because
    // some pages get token by themselves and an extra request
    // is unnecessary. Application must decide whether to
    // initialize client or not (done in App component)
  }

  public async initialize() {
    await this.getAccessToken()
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
      (this.user.tokenExpires || 0) < Date.now()
    ) {
      this.initialized = true

      await (this.tokenUpdateRequest = this.internalUpdateToken())
      this.tokenUpdateRequest = null
    }

    return this.user.token
  }

  /**
   * Fetches a new access token and caches it
   * This method may only be used by "getAccessToken
   */
  private async internalUpdateToken(): Promise<void> {
    try {
      const { data } = await this.get<ApiResponse.Auth.Token>(
        Endpoint.auth.token,
        { credentials: 'include' },
      )

      this.dispatch(
        authenticate({
          token: data.token,
          tokenExpires: getTokenExpirationTime(data.token),
          providers: data.providers,
          username: data.username,
          email: data.email,
          id: data.id,
        }),
      )
    } catch (e) {
      if (
        e instanceof HttpError &&
        (await e.getApiName()) === ApiErrorName.UNAUTHORIZED
      ) {
        this.dispatch(unauthenticate())
      } else {
        throw e
      }
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
      const error = new HttpError(req, res, options)

      // TODO: maybe remove this funcionality
      if (
        options.notifyErrors ||
        options.notifyErrorsExcept?.includes(await error.getApiName())
      ) {
        error.getApiMessage().then((text) => {
          this.dispatch(notifyError(text))
        })
      }

      throw error
    }
  }
}
