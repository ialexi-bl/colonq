import { Endpoints } from 'config/endpoints'
import { HTTPError, NetworkError } from '.'
import { StatusCode } from 'config/status-codes'
import { ThunkAction } from 'store/types'
import { notifyError } from 'store/view'
import ApiClient from 'services/client'
import LangErrors from 'lang/errors.json'

export function handleRequestError(e: Error): ThunkAction {
  return async (dispatch) => {
    if (e instanceof NetworkError) {
      dispatch(notifyError(LangErrors.network))
    } else if (e instanceof HTTPError) {
      const contentType = e.response.headers.get('Content-Type') || ''

      // Response is JSON
      if (contentType.includes('application/json')) {
        const json = await e.response.json()
        switch (json.status) {
          case StatusCode.TOO_LONG:
            dispatch(notifyError(LangErrors.tooLong))
            break
          case StatusCode.INVALID_DATA:
            dispatch(notifyError(LangErrors.invalidData))
            break
          case StatusCode.MISSING_SCOPE:
            dispatch(notifyError(LangErrors.missingScope))
            break
          case StatusCode.INVALID_TOKEN:
            dispatch(notifyError(LangErrors.invalidToken))
            break
          case StatusCode.EXPIRED_TOKEN:
            dispatch(notifyError(LangErrors.expiredToken))
            break
          case StatusCode.UNAUTHENTICATED:
            dispatch(notifyError(LangErrors.unauthenticated))
            break
          case StatusCode.TOO_MANY_REQUESTS:
            dispatch(notifyError(LangErrors.tooManyRequests))
            break
          case StatusCode.MISSING_PARAMETER:
            dispatch(notifyError(LangErrors.missingScope))
            break
          default:
            // TODO: log error
            dispatch(notifyError(LangErrors.unknown))
            sendRequestErrorLog(e, json)
        }
      }
      // Response is not JSON
      else {
        dispatch(notifyError(LangErrors.unknown))
        sendRequestErrorLog(e)
      }
    } else throw e
  }
}

export const sendRequestErrorLog = async (e: Error, json?: object) => {
  if (!(e instanceof HTTPError)) return

  const { response: res } = e
  try {
    let resBody
    if (json) {
      resBody = json
    } else if (
      (res.headers.get('Content-Type') || '').includes('application/json')
    ) {
      resBody = await res.json()
    } else {
      resBody = await res.text()
    }

    await ApiClient.post(Endpoints.Api.logError, {
      json: {
        type: 'server',
        method: res._req.method,
        code: res.status,
        url: res._req.url,
        req: res._opts.json || res._opts.body || {},
        res: resBody,
      },
    })
  } catch {}
}
