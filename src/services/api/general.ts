import { Endpoint } from 'services/api/config'
import Api from './api'

export default class GeneralApi {
  private constructor() {}

  public static log(data: object) {
    // TODO: maybe authorize
    return Api.post<null>(Endpoint.general.log, {
      json: data,
    })
  }
}
