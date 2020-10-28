import { App, Apps, EmptyUser, UserState } from './types'
import {
  LoadAppSuccessPayload,
  authenticate,
  authenticateError,
  authenticateSuccess,
  loadApp,
  loadAppError,
  loadAppSuccess,
  loadApps,
  loadAppsError,
  loadAppsSuccess,
  unauthenticate,
} from './actions'
import { createReducer } from 'store/util'

export const initialState: EmptyUser = {
  status: 'loading',
  tokenExpires: null,
  providers: [],
  username: null,
  token: null,
  email: null,
  id: null,

  appsStatus: 'none',
  appsList: [],
  apps: {},
}

export default createReducer<UserState>(
  {
    [String(authenticate)]: (state): UserState => ({
      ...state,
      status: 'loading',
    }),
    [String(authenticateError)]: (state): UserState => ({
      ...state,
      status: 'error',
    }),
    [String(authenticateSuccess)]: (_, payload): UserState => ({
      ...payload,
      appsList: [],
      apps: {},
      status: 'authenticated',
    }),
    [String(unauthenticate)]: (): UserState => ({
      ...initialState,
      status: 'unauthenticated',
    }),

    [String(loadApps)]: (state): UserState => ({
      ...state,
      appsStatus: 'loading',
      appsList: [],
      apps: {},
    }),
    [String(loadAppsSuccess)]: (state, apps: App[]): UserState => {
      const appsObj: Apps = {}
      apps.forEach((app) => {
        app.status = 'only-info'
        app.lessons = []
        appsObj[app.id] = app
      })

      return {
        ...state,
        appsStatus: 'loaded',
        appsList: apps.map((x) => x.id),
        apps: appsObj,
      }
    },
    [String(loadAppsError)]: (state): UserState => ({
      ...state,
      appsStatus: 'error',
    }),

    [String(loadApp)]: (state, app: string): UserState => ({
      ...state,
      apps: {
        ...state.apps,
        [app]: {
          ...state.apps[app],
          status: 'loading',
        },
      },
    }),
    [String(loadAppSuccess)]: (
      state,
      { app, title, icon, lessons }: LoadAppSuccessPayload,
    ): UserState => {
      const score = lessons.reduce((a, b) => a + b.score, 0) / lessons.length
      return {
        ...state,
        apps: {
          ...state.apps,
          [app]: {
            status: 'loaded',
            id: app,
            lessons,
            title,
            score,
            icon,
          },
        },
      }
    },
    [String(loadAppError)]: (state, app: string): UserState => ({
      ...state,
      apps: {
        ...state.apps,
        [app]: {
          ...state.apps[app],
          status: 'error',
        },
      },
    }),
  },
  initialState,
)
