import { Api } from 'core/api/config'
import { Lesson } from './types'
import { createAction } from 'store/util'

export enum UserAction {
  // There are separate actions for authentication request and start, because
  // requesting doesn't always trigger authentication
  AUTHENTICATE_REQUEST = 'USER/AUTHENTICATE/REQUEST',
  AUTHENTICATE_START = 'USER/AUTHENTICATE/START',
  AUTHENTICATE_SUCCESS = 'USER/AUTHENTICATE/SUCCESS',
  AUTHENTICATE_ERROR = 'USER/AUTHENTICATE/ERROR',
  UNAUTHENTICATE = 'USER/UNAUTHENTICATE',

  LOAD_APPS_REQUEST = 'USER/LOAD_APPS/REQUEST',
  LOAD_APPS_SUCCESS = 'USER/LOAD_APPS/SUCCESS',
  LOAD_APPS_ERROR = 'USER/LOAD_APPS/ERROR',

  LOAD_APP_REQUEST = 'USER/LOAD_APP/REQUEST',
  LOAD_APP_SUCCESS = 'USER/LOAD_APP/SUCCESS',
  LOAD_APP_ERROR = 'USER/LOAD_APP/ERROR',
  UPDATE_LESSONS = 'USER/UPDATE_LESSONS',

  LOGOUT = 'USER/LOGOUT',
  QUEUE_AUTH_METHOD = 'USER/QUEUE_AUTH_METHOD',
  REQUEST_AUTH_METHOD = 'USER/REQUEST_AUTH_METHOD',
}

export type LoadAppSuccessPayload = {
  app: string
  icon: string
  title: string
  lessons: Lesson[]
  iconsSet: string
  hasSettings: boolean
}
export type UpdateLessonsPayload = {
  app: string
  lessons: Lesson[]
}

export const authenticate = createAction(UserAction.AUTHENTICATE_REQUEST)
export const authenticateStart = createAction(UserAction.AUTHENTICATE_START)
export const authenticateError = createAction(UserAction.AUTHENTICATE_ERROR)
export const authenticateSuccess = createAction<Api.Auth.UserData>(
  UserAction.AUTHENTICATE_SUCCESS,
)
export const unauthenticate = createAction(UserAction.UNAUTHENTICATE)

export const loadApps = createAction(UserAction.LOAD_APPS_REQUEST)
export const loadAppsError = createAction(UserAction.LOAD_APPS_ERROR)
export const loadAppsSuccess = createAction<Api.User.CategoryDescription[]>(
  UserAction.LOAD_APPS_SUCCESS,
)

export const loadApp = createAction<string>(UserAction.LOAD_APP_REQUEST)
export const loadAppError = createAction<string>(UserAction.LOAD_APP_ERROR)
export const loadAppSuccess = createAction<LoadAppSuccessPayload>(
  UserAction.LOAD_APP_SUCCESS,
)
export const updateLessons = createAction<UpdateLessonsPayload>(
  UserAction.UPDATE_LESSONS,
)
