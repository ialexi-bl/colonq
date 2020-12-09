export interface ViewState {
  loading: string[]
  notification: null | NotificationDescription
  navigationVisible: boolean
  previousElevation: ElevationState
  currentElevation: ElevationState
}
export type ElevationState = {
  value: number
  id: string | number
}
export type NotificationDescription = {
  type: NotificationType
  text: string
}
export type NotificationType = 'info' | 'error'
