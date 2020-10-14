import { HttpError } from 'services/errors'
import { ThunkAction } from 'store/types'
import { createAction } from 'redux-act'
import LangErrors from 'lang/errors.json'

export const openLoading = createAction<string>('Open loading')
export const closeLoading = createAction<string>('Close loading')
export const closePageSpecificLoading = createAction(
  'Closes all loadings that are not opened by router or app',
)

export const showNavigation = createAction('Show navigation panel')
export const hideNavigation = createAction('Hide navigation panel')

export const notifyInfo = createAction<string>('Opens information notification')
export const notifyError = createAction<string>('Opens error notification')
export const closeNotification = createAction('Closes current notification')

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
