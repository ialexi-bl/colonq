import { createContext } from 'react'
import { positionValues } from 'react-custom-scrollbars'

export type ScrollListener = (data: positionValues) => unknown
export type IAppletSettingsContext = (fn: ScrollListener) => void

export const AppletSettingsContext = createContext<IAppletSettingsContext>(
  () => {},
)
