import { ApiResponse, Endpoint } from './config'
import Api from './api'

export default class SubscriptionApi {
  public static subscribe(subscription: PushSubscription, hour: number) {
    return (token: string) =>
      Api.post(Endpoint.subscription, {
        token,
        json: { hour, subscription: subscription.toJSON() },
      })
  }

  public static unsubscribe(endpoint: string) {
    return (token: string) =>
      Api.delete(Endpoint.subscription, { token, json: { endpoint } })
  }

  public static modifyHour(endpoint: string, hour: number) {
    return (token: string) =>
      Api.patch(Endpoint.subscription, { token, json: { endpoint, hour } })
  }

  public static getHour(endpoint: string) {
    return (token: string) =>
      Api.get<ApiResponse.Subscription>(
        `${Endpoint.subscription}?endpoint=${encodeURIComponent(endpoint)}`,
        { token },
      )
  }
}
