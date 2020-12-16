import { AppState } from 'store/types'
import {
  AuthorizedMethod,
  User,
  UserAction,
  UserState,
  authenticate,
} from 'store/user'
import { UnauthenticatedError } from 'services/errors'
import { call, put, select, take } from 'redux-saga/effects'

export function* executeAuthorizedMethod(method: AuthorizedMethod<any>) {
  let user: UserState = yield select((state: AppState) => state.user)

  if (!user.token || user.tokenExpires - Date.now() < 500) {
    yield put(authenticate())
    const { type } = yield take([
      UserAction.AUTHENTICATE_SUCCESS,
      UserAction.AUTHENTICATE_ERROR,
      UserAction.UNAUTHENTICATE,
    ])

    if (type !== UserAction.AUTHENTICATE_SUCCESS) {
      throw new UnauthenticatedError()
    }
    user = (yield select((state: AppState) => state.user)) as User
  }

  const actions: any[] = []
  const { data } = yield call(method, user.token, user.id, (action: any) =>
    actions.push(action),
  )
  yield* actions
  return data
}
