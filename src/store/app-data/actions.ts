import { AppDataActions, SET_APP_DATA } from './types'

export const setAppData = <TData>(
  applet: string,
  {
    data,
    version,
    fetched = true,
  }: {
    version: number
    fetched?: boolean
    data: TData
  },
): AppDataActions['SET_APP_DATA'] => ({
  type: SET_APP_DATA,
  payload: {
    applet,
    fetched,
    version,
    data,
  },
})
