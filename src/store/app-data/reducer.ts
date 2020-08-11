import { AppDataAction, AppDataState, SET_APP_DATA } from './types'

export const initialState: AppDataState = {}

export default function reducer(
  state: AppDataState = initialState,
  action: AppDataAction,
): AppDataState {
  switch (action.type) {
    case SET_APP_DATA: {
      const { applet, data, version, fetched } = action.payload
      return {
        ...state,
        [applet]: {
          version,
          fetched,
          data,
        },
      }
    }
    default:
      return state
  }
}
