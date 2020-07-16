export const SET_LOADING = 'SET_LOADING'
export const TOGGLE_NAV = 'TOGGLE_NAV'
export const FORCE_LOADING = 'FORCE_LOADING'
export const OPEN_NAVIGATION = 'OPEN_NAVIGATION'
export const CLOSE_NAVIGATION = 'CLOSE_NAVIGATION'
export const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'
export const HIDE_NON_ROUTER_LOADING = 'HIDE_NON_ROUTER_LOADING'

export interface ViewState {
  loading: string[]
  navigationVisible: boolean
  // TODO: delete
  navOpen: boolean
  notification: null | NotificationDescription
}
export type NotificationDescription = {
  type: NotificationType
  text: string
  hash: number
}
export type NotificationType = 'info' | 'error'

export type ViewActions = {
  SET_LOADING: {
    type: typeof SET_LOADING
    payload: {
      state: boolean
      id: string
    }
  }
  FORCE_LOADING: {
    type: typeof FORCE_LOADING
    payload: {
      id: string
    }
  }
  HIDE_NON_ROUTER_LOADING: {
    type: typeof HIDE_NON_ROUTER_LOADING
  }
  OPEN_NAVIGATION: {
    type: typeof OPEN_NAVIGATION
  }
  CLOSE_NAVIGATION: {
    type: typeof CLOSE_NAVIGATION
  }
  TOGGLE_NAV: {
    type: typeof TOGGLE_NAV
    payload: {
      state: boolean
    }
  }
  OPEN_NOTIFICATION: {
    type: typeof OPEN_NOTIFICATION
    payload: {
      text: string
      type: 'info' | 'error'
    }
  }
  CLOSE_NOTIFICATION: {
    type: typeof CLOSE_NOTIFICATION
  }
}
export type ViewAction = ViewActions[keyof ViewActions]
