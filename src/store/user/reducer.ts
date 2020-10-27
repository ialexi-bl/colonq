import { App, Apps, UserState } from './types'
import { addAppDetails, addApps, authenticate, unauthenticate } from './actions'
import { createReducer } from 'redux-act'

export const initialState: UserState = {
  status: 'loading',
  tokenExpires: null,
  providers: [],
  username: null,
  token: null,
  email: null,
  appsList: [],
  apps: null,
  id: null,
}

export default createReducer<UserState>(
  {
    [String(authenticate)]: (_, payload) => ({
      ...payload,
      appsList: [],
      apps: {},
      status: 'authenticated',
    }),
    [String(unauthenticate)]: () => ({
      ...initialState,
      status: 'unauthenticated',
    }),

    [String(addApps)]: (state, apps: Omit<App, 'loaded' | 'lessons'>[]) => {
      if (state.status !== 'authenticated') {
        return state
      }

      const appsObj: Apps = {}
      apps.forEach((app) => {
        appsObj[app.id] = {
          ...app,
          loaded: false,
          lessons: [],
        }
      })

      return {
        ...state,
        appsList: apps.map((app) => app.id),
        apps: appsObj,
      }
    },
    [String(addAppDetails)]: (state, { app, lessons }) => {
      if (state.status !== 'authenticated') return state

      return {
        ...state,
        apps: {
          ...state.apps,
          [app]: {
            ...state.apps[app],
            loaded: true,
            lessons,
          },
        },
      }
    },
  },
  initialState,
)
