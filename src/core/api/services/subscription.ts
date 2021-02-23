import { Api, ApiResponse, Endpoint } from '../config'
import ApiService from './api'

function subscribe(
  subscription: PushSubscription,
  hour: number,
): Promise<unknown> {
  return ApiService.post(Endpoint.subscription, {
    json: { hour, subscription: subscription.toJSON() },
  })
}

function unsubscribe(endpoint: string): Promise<unknown> {
  return ApiService.delete(Endpoint.subscription, { json: { endpoint } })
}

function modifyHour(endpoint: string, hour: number): Promise<unknown> {
  return ApiService.patch(Endpoint.subscription, {
    json: { endpoint, hour },
  })
}

function getHour(endpoint: string): ApiResponse<Api.Subscription> {
  return ApiService.get<Api.Subscription>(
    `${Endpoint.subscription}?endpoint=${encodeURIComponent(endpoint)}`,
  )
}

const SubscriptionService = { subscribe, unsubscribe, modifyHour, getHour }
export default SubscriptionService
