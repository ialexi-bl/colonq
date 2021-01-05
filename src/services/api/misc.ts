import { Endpoint } from './config'
import Api from './api'

export default class MiscApi {
  public static sendFeedback(message: string) {
    return (token: string) =>
      Api.post<null>(Endpoint.general.feedback, { json: { message }, token })
  }
}
