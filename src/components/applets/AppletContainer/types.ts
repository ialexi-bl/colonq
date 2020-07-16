import { ComponentType } from 'react'

export type AppletStartProps = {
  openSettings: () => void
  startSession: () => void
}
export type AppletSettingsProps = {
  backToStart: () => void
}
export type AppletSessionProps = {
  backToStart: () => void
}

export type AppletContainerProps = {
  settings?: ComponentType<AppletSettingsProps>
  session: ComponentType<AppletSessionProps>
  start: ComponentType<AppletStartProps>
}
