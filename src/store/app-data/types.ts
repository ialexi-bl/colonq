export const SET_APP_DATA = 'APP_DATA/SET'

export interface AppDataState {
  [key: string]: AppData
}

export type AppData<TData = any> = {
  version: number
  fetched: boolean
  data: TData
}
export const defaultData: AppData = { version: -1, data: null, fetched: false }

export interface AppDataActions {
  SET_APP_DATA: {
    type: typeof SET_APP_DATA
    payload: {
      applet: string
      fetched: boolean
      version: number
      data: any
    }
  }
}
export type AppDataAction = AppDataActions[keyof AppDataActions]
