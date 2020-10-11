import { createAction } from 'redux-act'

export const openLoading = createAction<string>('Open loading')
export const closeLoading = createAction<string>('Close loading')
export const closePageSpecificLoading = createAction<string>(
  'Closes all loadings that are not opened by router or app',
)

export const showNavigation = createAction('Show navigation panel')
export const hideNavigation = createAction('Hide navigation panel')

export const notifyInfo = createAction<string>('Opens information notification')
export const notifyError = createAction<string>('Opens error notification')
export const closeNotification = createAction('Closes current notification')
