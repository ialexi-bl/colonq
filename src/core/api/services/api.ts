import { Api } from 'core/api/config'
import { HttpError } from 'core/errors'
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
          throw error
        }
      },
    ],
  },
})

function get<T>(...args: Parameters<typeof ky.get>): Promise<Api.Success<T>> {
  return client.get(...args).json<Api.Success<T>>()
}

function put<T>(...args: Parameters<typeof ky.get>): Promise<Api.Success<T>> {
  return client.put(...args).json<Api.Success<T>>()
}

function post<T>(...args: Parameters<typeof ky.get>): Promise<Api.Success<T>> {
  return client.post(...args).json<Api.Success<T>>()
}

function patch<T>(...args: Parameters<typeof ky.get>): Promise<Api.Success<T>> {
  return client.patch(...args).json<Api.Success<T>>()
}

function deleteMethod<T>(
  ...args: Parameters<typeof ky.get>
): Promise<Api.Success<T>> {
  return client.delete(...args).json<Api.Success<T>>()
}

const ApiService = {
  get,
  put,
  post,
  patch,
  delete: deleteMethod,
}
export default ApiService
