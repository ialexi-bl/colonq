import { ApiMethod, UnauthorizedApiMethod } from 'services/api/api'
import { AppState } from 'store/types'
import { User, UserAction, UserState, authenticate } from 'store/user'
import { call, put, select, take } from 'redux-saga/effects'

// These functions are weakly typed, because they are anyways used with
// "yield", which is unable to infer their return type
export function* executeMethod(method: UnauthorizedApiMethod<any>) {
  const actions: any[] = []
  const { data } = yield call(method, (action: any) => actions.push(action))
  yield* actions

  return data
}

export function* executeAuthorizedMethod(method: ApiMethod<any>) {
  let user: UserState = yield select((state: AppState) => state.user)

  if (!user.token) {
    yield put(authenticate())
    const { type } = yield take([
      UserAction.AUTHENTICATE_SUCCESS,
      UserAction.AUTHENTICATE_ERROR,
      UserAction.UNAUTHENTICATE,
    ])

    if (type !== UserAction.AUTHENTICATE_SUCCESS) {
      // TODO: check if throwing error breaks something
      throw new Error(
        `Couldn't perform request, because user is not authenticated`,
      )
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
