import { ApiResponse } from 'services/api/config'
import {
  Apps,
  AuthorizedMethodInternal,
  EmptyUser,
  Lesson,
  UserState,
} from './types'
import {
  LoadAppSuccessPayload,
  UpdateLessonsPayload,
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
  updateLessons,
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

const getScore = (lessons: Lesson[]) =>
  lessons.reduce((a, b) => a + b.score, 0) / lessons.length
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
      ...(state.id === payload.id ? state : initialState),
      ...payload,
      methodsQueue: [],
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

          const previous = state.apps[app.id]
          apps[app.id] =
            previous?.status === 'loaded'
              ? {
                  ...app,
                  status: 'loaded',
                  lessons: previous.lessons,
                }
              : {
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
    ): UserState => ({
      ...state,
      apps: {
        ...state.apps,
        [app]: {
          score: getScore(lessons),
          status: 'loaded',
          id: app,
          lessons,
          title,
          icon,
        },
      },
    }),
    [String(updateLessons)]: (
      state,
      { app: appName, lessons }: UpdateLessonsPayload,
    ) => {
      const app = state.apps[appName]
      if (app?.status !== 'loaded') {
        // If app hasn't been loaded, then loading will be requested later
        // by components that will need it
        return state
      }
      return {
        ...state,
        apps: {
          ...state.apps,
          [appName]: {
            ...app,
            score: getScore(lessons),
            lessons,
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
