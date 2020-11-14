import { ApiResponse } from 'services/api/config'
import { Apps, AuthorizedMethodInternal, EmptyUser, UserState } from './types'
import {
  LoadAppSuccessPayload,
  authenticateError,
  authenticateStart,
  authenticateSuccess,
  loadApp,
  loadAppError,
  loadAppSuccess,
  loadApps,
  loadAppsError,
  loadAppsSuccess,
  queueAuthMethod,
  unauthenticate,
} from './actions'
import { createReducer } from 'store/util'
import { getTokenExpirationTime } from 'util/jwt'

export const initialState: EmptyUser = {
  status: 'loading',
  tokenExpires: null,
  providers: [],
  username: null,
  token: null,
  email: null,
  id: null,

  appsStatus: 'none',
  categories: [],
  appsList: [],
  apps: {},

  methodsQueue: [],
}

export default createReducer<UserState>(
  {
    [String(authenticateStart)]: (state): UserState => ({
      ...state,
      status: 'loading',
    }),
    [String(authenticateError)]: (state): UserState => ({
      ...state,
      status: 'error',
    }),
    [String(authenticateSuccess)]: (
      state,
      payload: ApiResponse.Auth.UserData,
    ): UserState => ({
      methodsQueue: state.methodsQueue,
      ...payload,
      // TODO: maybe not reset these fields
      appsStatus: 'none',
      categories: [],
      appsList: [],
      apps: {},
      tokenExpires: getTokenExpirationTime(payload.token),
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
    [String(loadAppsSuccess)]: (
      state,
      categories: ApiResponse.User.CategoryDescription[],
    ): UserState => {
      const apps: Apps = {}
      const appsList: string[] = []

      categories.forEach((category) => {
        category.apps.forEach((app) => {
          appsList.push(app.id)
          apps[app.id] = {
            ...app,
            status: 'only-info',
            lessons: [],
          }
        })
      })

      return {
        ...state,
        appsStatus: 'loaded',
        categories,
        appsList,
        apps,
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

    [String(queueAuthMethod)]: (
      state,
      method: AuthorizedMethodInternal<any>,
    ) => ({
      ...state,
      methodsQueue: state.methodsQueue.concat(method),
    }),
  },
  initialState,
)
