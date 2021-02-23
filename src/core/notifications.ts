import { ColonqError, HttpError, NotificationsError } from './errors'
import { ThunkAction } from 'store/types'
import { base64ToUint8Array } from 'util/array'
import { notifyError, notifyInfo } from 'store/view'
import Config from 'config'
import StoreController from 'store/StoreController'
import SubscriptionApi from './api/services/subscription'

async function getHour(): Promise<number | null> {
  const subscription = await getSubscription()
  if (!subscription) return null

  try {
    const { data } = await SubscriptionApi.getHour(subscription.endpoint)

    return utcToHour(data.hour)
  } catch (e) {
    // TODO: maybe log this error
    return null
  }
}

async function setHour(hour: number): Promise<void> {
  const subscription = await getSubscription()
  if (!subscription) return

  await SubscriptionApi.modifyHour(subscription.endpoint, hourToUtc(hour))
}

async function subscribe(hour: number): Promise<boolean> {
  try {
    if (await getSubscription()) return true

    const registration = await getRegistration()
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(Config.VAPID_KEY),
    })

    await SubscriptionApi.subscribe(subscription, hourToUtc(hour))
    StoreController.dispatch(
      notifyInfo('Теперь ты будешь получать уведомления о занятиях'),
    )
    return true
  } catch (e) {
    StoreController.dispatch(
      notifyError(
        e instanceof ColonqError
          ? e.message
          : 'Не удалось включить уведомления',
      ),
    )
    return false
  }
}

function unsubscribe(): ThunkAction<Promise<boolean>> {
  return async (dispatch) => {
    try {
      const subscription = await getSubscription()
      if (!subscription) {
        return true
      }

      await Promise.all([
        SubscriptionApi.unsubscribe(subscription.endpoint),
        subscription.unsubscribe(),
      ])

      dispatch(
        notifyInfo('Ты больше не будешь получать уведомления о занятиях'),
      )
      return true
    } catch (e) {
      if (e instanceof HttpError && e.status === 404) {
        return true
      }
      dispatch(
        notifyInfo(
          e instanceof ColonqError
            ? e.message
            : 'Не удалось отключить уведомления, попробуй ещё раз',
        ),
      )
      return false
    }
  }
}

const NotificationsController = {
  getHour,
  setHour,
  subscribe,
  unsubscribe,
}
export default NotificationsController

function hourToUtc(hour: number) {
  const d = new Date()
  d.setHours(hour)
  return d.getUTCHours()
}

function utcToHour(hour: number) {
  const d = new Date()
  d.setUTCHours(hour)
  return d.getHours()
}

async function getRegistration(): Promise<ServiceWorkerRegistration> {
  if (!('serviceWorker' in navigator)) {
    throw new NotificationsError(
      'Твой браузер не поддерживает уведомления. Обнови его, чтобы включить их',
    )
  }
  const registrations = await navigator.serviceWorker.getRegistrations()
  if (!registrations.length) {
    throw new NotificationsError('Не удалось получить доступ к уведомлениям')
  }
  return registrations[0]
}

function getSubscription() {
  return getRegistration().then((r) => r && r.pushManager.getSubscription())
}
