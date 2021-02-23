import { ApiResponse, Endpoint } from '../config'
import ApiService from './api'

function sendFeedback(message: string): ApiResponse<null> {
  return ApiService.post<null>(Endpoint.general.feedback, {
    json: { message },
  })
}

function log(data: Record<string, unknown>): ApiResponse<null> {
  // TODO: maybe authorize
  return ApiService.post<null>(Endpoint.general.log, {
    json: data,
  })
}

const MiscellaneousService = { sendFeedback, log }
export default MiscellaneousService
