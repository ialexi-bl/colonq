import { Api } from 'core/api/config'
import { Apps, EmptyUser, UserState } from './types'
import {
  authenticateError,
  authenticateStart,
  authenticateSuccess,
  loadApps,
  loadAppsError,
  loadAppsSuccess,
  unauthenticate,
} from './actions'
import { createReducer } from 'store/util'

export const initialState: EmptyUser = {
  status: 'loading',
  providers: [],
  username: null,
  email: null,
  id: null,

  appsStatus: 'none',
  categories: [],
  appsList: [],
  apps: {},
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
      payload: Api.Auth.UserData,
    ): UserState => ({
      ...(state.id === payload.id ? state : initialState),
      ...payload,
      status: 'authenticated',
    }),
    [String(unauthenticate)]: (): UserState => ({
      ...initialState,
      status: 'unauthenticated',
    }),

    [String(loadApps)]: (state): UserState => ({
      ...state,
      appsStatus: 'loading',
    }),
    [String(loadAppsSuccess)]: (
      state,
      categories: Api.User.CategoryDescription[],
    ): UserState => {
      const apps: Apps = {}
      const appsList: string[] = []

      categories.forEach((category) => {
        category.apps.forEach((app) => {
          appsList.push(app.id)
          apps[app.id] = app
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
  },
  initialState,
)
