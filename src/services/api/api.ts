import { ApiResponse } from 'services/client/config'
import { HttpError } from 'services/errors'
import ky from 'ky'

const client = ky.create({
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
  },
})

export interface UnauthorizedApiMethod<T> {
  (): Promise<ApiResponse.Success<T>>
}
export interface AuthorizedApiMethod<T> {
  (token: string, id: string): Promise<ApiResponse.Success<T>>
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
}
