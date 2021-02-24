import { ApiPromise, Endpoint } from '../config'
import ApiService from './api'

function sendFeedback(message: string): ApiPromise<null> {
  return ApiService.post<null>(Endpoint.general.feedback, {
    json: { message },
  })
}

function log(data: Record<string, unknown>): ApiPromise<null> {
  // TODO: maybe authorize
  return ApiService.post<null>(Endpoint.general.log, {
    json: data,
  })
}

const MiscellaneousService = { sendFeedback, log }
export default MiscellaneousService
