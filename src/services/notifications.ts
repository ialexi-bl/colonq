import { ColonqError, HttpError, NotificationsError } from './errors'
import { ThunkAction } from 'store/types'
import { base64ToUint8Array } from 'util/array'
import { executeAuthorizedMethod } from 'store/user'
import { notifyError, notifyInfo } from 'store/view'
import Config from 'config'
import SubscriptionApi from './api/subscription'

export default class NotificationsController {
  public static getHour(): ThunkAction<Promise<number | null>> {
    return async (dispatch) => {
      const subscription = await this.getSubscription()
      if (!subscription) return null

      try {
        const { data } = await dispatch(
          executeAuthorizedMethod(
            SubscriptionApi.getHour(subscription.endpoint),
          ),
        )
        return this.utcToHour(data.hour)
      } catch (e) {
        // TODO: maybe log this error
        return null
      }
    }
  }

  public static setHour(hour: number): ThunkAction<Promise<void>> {
    return async (dispatch) => {
      const subscription = await this.getSubscription()
      if (!subscription) return

      await dispatch(
        executeAuthorizedMethod(
          SubscriptionApi.modifyHour(
            subscription.endpoint,
            this.hourToUtc(hour),
          ),
        ),
      )
    }
  }

  public static subscribe(hour: number): ThunkAction<Promise<boolean>> {
    return async (dispatch) => {
      try {
        if (await this.getSubscription()) return true

        const registration = await this.getRegistration()
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: base64ToUint8Array(Config.VAPID_KEY),
        })

        await dispatch(
          executeAuthorizedMethod(
            SubscriptionApi.subscribe(subscription, this.hourToUtc(hour)),
          ),
        )
        dispatch(notifyInfo('Теперь ты будешь получать уведомления о занятиях'))
        return true
      } catch (e) {
        dispatch(
          notifyError(
            e instanceof ColonqError
              ? e.message
              : 'Не удалось включить уведомления',
          ),
        )
        return false
      }
    }
  }

  public static unsubscribe(): ThunkAction<Promise<boolean>> {
    return async (dispatch) => {
      try {
        const subscription = await this.getSubscription()
        if (!subscription) {
          return true
        }

        await Promise.all([
          dispatch(
            executeAuthorizedMethod(
              SubscriptionApi.unsubscribe(subscription.endpoint),
            ),
          ),
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

  private static hourToUtc(hour: number) {
    const d = new Date()
    d.setHours(hour)
    return d.getUTCHours()
  }

  private static utcToHour(hour: number) {
    const d = new Date()
    d.setUTCHours(hour)
    return d.getHours()
  }

  private static async getRegistration(): Promise<ServiceWorkerRegistration> {
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

  private static getSubscription() {
    return this.getRegistration().then(
      (r) => r && r.pushManager.getSubscription(),
    )
  }
}
