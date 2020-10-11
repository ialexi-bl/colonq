export interface ViewState {
  loading: string[]
  notification: null | NotificationDescription
  navigationVisible: boolean
}
export type NotificationDescription = {
  type: NotificationType
  text: string
}
export type NotificationType = 'info' | 'error'
