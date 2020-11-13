export interface ViewState {
  loading: string[]
  notification: null | NotificationDescription
  navigationVisible: boolean
  previousElevation: number
  currentElevation: number
}
export type NotificationDescription = {
  type: NotificationType
  text: string
}
export type NotificationType = 'info' | 'error'
