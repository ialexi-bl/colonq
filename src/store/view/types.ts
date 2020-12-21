export interface ViewState {
  loading: string[]
  notification: null | NotificationDescription
  currentElevation: ElevationState
  navigationVisible: boolean
  previousElevation: ElevationState
  animationsEnabled: boolean
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
