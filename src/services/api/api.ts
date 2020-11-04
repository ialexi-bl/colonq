import { ApiResponse } from 'services/client/config'
import { HttpError } from 'services/errors'
import { MixedDispatch } from 'store/types'
import { authenticateSuccess } from 'store/user'
import Config from 'config'
import ky, { RetryOptions } from 'ky'

const client = ky.create({
  prefixUrl: Config.API_URL,
  credentials: Config.CORS_MODE,
  hooks: {
    beforeRequest: [
      (req, opts) => {
        if (opts.token) {
          req.headers.set('Authorization', `Bearer ${opts.token}`)
        }
      },
    ],
    afterResponse: [
      (req, opts, res) => {
        if (!res.ok) throw new HttpError(req, res, opts)
      },
    ],
    beforeRetry: [
      ({ error, options }) => {
        if (!(error instanceof HttpError)) return

        const status = error.status
        if (!(options.retry as RetryOptions).statusCodes!.includes(status)) {
          return ky.stop as any
        }
      },
    ],
  },
})

export interface UnauthorizedApiMethod<T> {
  (dispatch: MixedDispatch): Promise<ApiResponse.Success<T>>
}
export interface AuthorizedApiMethod<T> {
  (token: string, id: string, dispatch: MixedDispatch): Promise<
    ApiResponse.Success<T>
  >
}
export type ApiMethod<T> = UnauthorizedApiMethod<T> | AuthorizedApiMethod<T>

export default class Api {
  public static get<T>(...args: Parameters<typeof ky.get>) {
    return client.get(...args).json<ApiResponse.Success<T>>()
  }

  public static put<T>(...args: Parameters<typeof ky.get>) {
    return client.put(...args).json<ApiResponse.Success<T>>()
  }

  public static post<T>(...args: Parameters<typeof ky.get>) {
    return client.post(...args).json<ApiResponse.Success<T>>()
  }

  public static authenticate<T extends ApiResponse.Auth.UserData>(
    fetch: UnauthorizedApiMethod<T>,
  ) {
    return (dispatch: MixedDispatch) =>
      fetch(dispatch).then((response) => {
        dispatch(authenticateSuccess(response.data))
        return response
      })
  }

  public static authorizedAuthenticate<T extends ApiResponse.Auth.UserData>(
    fetch: AuthorizedApiMethod<T>,
  ) {
    return (token: string, id: string, dispatch: MixedDispatch) =>
      fetch(token, id, dispatch).then((response) => {
        dispatch(authenticateSuccess(response.data))
        return response
      })
  }
}
