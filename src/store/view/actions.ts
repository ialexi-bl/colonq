import {
  CLOSE_NOTIFICATION,
  FORCE_LOADING,
  HIDE_NON_ROUTER_LOADING,
  NotificationType,
  OPEN_NOTIFICATION,
  SET_LOADING,
  TOGGLE_NAV,
  ViewActions,
} from './types'

export const toggleNav = (state: boolean): ViewActions['TOGGLE_NAV'] => ({
  type: TOGGLE_NAV,
  payload: { state },
})

export const setLoading = (
  state = true,
  id: string,
): ViewActions['SET_LOADING'] => ({
  type: SET_LOADING,
  payload: { state, id },
})
export const showLoading = (id: string): ViewActions['SET_LOADING'] =>
  setLoading(true, id)
export const hideLoading = (id: string): ViewActions['SET_LOADING'] =>
  setLoading(false, id)
export const forceLoading = (id: string): ViewActions['FORCE_LOADING'] => ({
  type: FORCE_LOADING,
  payload: { id },
})
export const hideNonRouterLoading = (): ViewActions['HIDE_NON_ROUTER_LOADING'] => ({
  type: HIDE_NON_ROUTER_LOADING,
})

const openNotification = (
  text: string,
  type: NotificationType = 'info',
): ViewActions['OPEN_NOTIFICATION'] => ({
  type: OPEN_NOTIFICATION,
  payload: {
    text,
    type,
  },
})
export const notifyInfo = (text: string) => openNotification(text, 'info')
export const notifyError = (text: string) => openNotification(text, 'error')

export const closeNotification = (): ViewActions['CLOSE_NOTIFICATION'] => ({
  type: CLOSE_NOTIFICATION,
})
