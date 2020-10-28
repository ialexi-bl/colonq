import { Endpoint } from 'services/client/config'
import Api from './api'

export default class AppsApi {
  public static loadApps() {
    return (token: string, id: string) =>
      Api.get(Endpoint.user.getApps(id), { token })
  }

  public static loadApp(category: string, name?: string) {
    return (token: string, id: string) =>
      Api.get(
        Endpoint.user.getApp(id, name ? `${category}/${name}` : category),
        { token },
      )
  }
}
