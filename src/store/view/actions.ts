import { HttpError } from 'services/errors'
import { ThunkAction } from 'store/types'
import { createAction } from 'store/util'
import LangErrors from 'lang/errors.json'

export enum ViewAction {
  OPEN_LOADING = 'VIEW/OPEN_LOADING',
  CLOSE_LOADING = 'VIEW/CLOSE_LOADING',
  CLOSE_PAGE_SPECIFIC_LOADING = 'VIEW/CLOSE_PAGE_SPECIFIC_LOADING',

  SET_ELEVATION = 'VIEW/SET_ELEVATION',
  SHOW_NAVIGATION = 'VIEW/SHOW_NAVIGATION',
  HIDE_NAVIGATION = 'VIEW/HIDE_NAVIGATION',
  NOTIFY_INFO = 'VIEW/NOTIFY_INFO',
  NOTIFY_ERROR = 'VIEW/NOTIFY_ERROR',
  CLOSE_NOTIFICATION = 'VIEW/CLOSE_NOTIFICATION',
}

export const setElevation = createAction<number>(ViewAction.SET_ELEVATION)

export const openLoading = createAction<string>(ViewAction.OPEN_LOADING)
export const closeLoading = createAction<string>(ViewAction.CLOSE_LOADING)
/** Closes loadings that are not opened by top level components */
export const closePageSpecificLoading = createAction(
  ViewAction.CLOSE_PAGE_SPECIFIC_LOADING,
)

export const showNavigation = createAction(ViewAction.SHOW_NAVIGATION)
export const hideNavigation = createAction(ViewAction.HIDE_NAVIGATION)

export const notifyInfo = createAction<string>(ViewAction.NOTIFY_INFO)
export const notifyError = createAction<string>(ViewAction.NOTIFY_ERROR)
export const closeNotification = createAction(ViewAction.CLOSE_NOTIFICATION)

export const notifyHttpError = (error: HttpError): ThunkAction<void> => async (
  dispatch,
) => {
  const message = await error.getApiMessage()
  dispatch(notifyError(message))
}
export const notifyErrorObject = (e: Error): ThunkAction<void> => (dispatch) =>
  e instanceof HttpError
    ? dispatch(notifyHttpError(e))
    : dispatch(notifyError(LangErrors.unknown))
