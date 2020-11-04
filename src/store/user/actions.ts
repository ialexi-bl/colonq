import { ApiResponse } from 'services/client/config'
import { Lesson } from './types'
import { createAction } from 'store/util'

export enum UserAction {
  AUTHENTICATE_REQUEST = 'USER/AUTHENTICATE/REQUEST',
  AUTHENTICATE_SUCCESS = 'USER/AUTHENTICATE/SUCCESS',
  AUTHENTICATE_ERROR = 'USER/AUTHENTICATE/ERROR',
  UNAUTHENTICATE = 'USER/UNAUTHENTICATE',

  LOAD_APPS_REQUEST = 'USER/LOAD_APPS/REQUEST',
  LOAD_APPS_SUCCESS = 'USER/LOAD_APPS/SUCCESS',
  LOAD_APPS_ERROR = 'USER/LOAD_APPS/ERROR',

  LOAD_APP_REQUEST = 'USER/LOAD_APP/REQUEST',
  LOAD_APP_SUCCESS = 'USER/LOAD_APP/SUCCESS',
  LOAD_APP_ERROR = 'USER/LOAD_APP/ERROR',

  LOGOUT = 'USER/LOGOUT',
}

export type LoadAppSuccessPayload = {
  app: string
  title: string
  icon: string
  lessons: Lesson[]
}

export const authenticate = createAction(UserAction.AUTHENTICATE_REQUEST)
export const authenticateError = createAction(UserAction.AUTHENTICATE_ERROR)
export const authenticateSuccess = createAction<ApiResponse.Auth.UserData>(
  UserAction.AUTHENTICATE_SUCCESS,
)
export const unauthenticate = createAction(UserAction.UNAUTHENTICATE)

export const loadApps = createAction(UserAction.LOAD_APPS_REQUEST)
export const loadAppsError = createAction(UserAction.LOAD_APPS_ERROR)
export const loadAppsSuccess = createAction<
  ApiResponse.User.CategoryDescription[]
>(UserAction.LOAD_APPS_SUCCESS)

export const loadApp = createAction<string>(UserAction.LOAD_APP_REQUEST)
export const loadAppError = createAction<string>(UserAction.LOAD_APP_ERROR)
export const loadAppSuccess = createAction<LoadAppSuccessPayload>(
  UserAction.LOAD_APP_SUCCESS,
)
