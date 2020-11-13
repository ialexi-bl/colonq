import { ApiResponse, Endpoint } from 'services/client/config'
import Api from './api'

export default class AppsApi {
  public static getAppsList() {
    return Api.get<ApiResponse.Apps.GetApps>(Endpoint.apps.get)
  }

  public static loadApps() {
    return (token: string, id: string) =>
      Api.get<ApiResponse.User.GetApps>(Endpoint.user.getApps(id), { token })
  }

  public static loadApp(category: string, name?: string) {
    return (token: string, id: string) =>
      Api.get<ApiResponse.User.GetApp>(
        Endpoint.user.getApp(id, name ? `${category}/${name}` : category),
        { token },
      )
  }
}
