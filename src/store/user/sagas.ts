import { ApiErrorName, ApiResponse } from 'services/api/config'
import { AppState } from 'store/types'
import { AppsApi, UserApi } from 'services/api'
import { AuthorizedMethodInternal, UserState } from './types'
import { Channel, Task } from 'redux-saga'
import { HttpError } from 'services/errors'
import {
  UserAction,
  authenticate,
  authenticateError,
  authenticateStart,
  authenticateSuccess,
  loadAppError,
  loadAppSuccess,
  loadAppsError,
  loadAppsSuccess,
  queueAuthMethod,
  unauthenticate,
} from './actions'
import {
  actionChannel,
  all,
  call,
  cancel,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLeading,
} from 'redux-saga/effects'
import { executeAuthorizedMethod } from 'store/util'
import { notifyErrorObject } from 'store/view'

// Logic

function* updateToken() {
  try {
    yield put(authenticateStart())
    const { data }: ApiResponse.Success<ApiResponse.Auth.Token> = yield call(
      UserApi.fetchToken,
    )
    yield put(authenticateSuccess(data))

    const methods: AuthorizedMethodInternal<any>[] = yield select(
      (state: AppState) => state.user.methodsQueue,
    )
    methods.forEach((method) => {
      method(data.token, data.id)
    })
  } catch (e) {
    if (e instanceof HttpError) {
      const name: string = yield call(e.getApiName)

      if (name === ApiErrorName.UNAUTHORIZED) {
        yield put(unauthenticate())
        return
      }
    }
    console.error(e)
    yield put(authenticateError())
    yield put(notifyErrorObject(e) as any)
  }
}

function* loadApps() {
  try {
    const data: ApiResponse.User.GetApps = yield call(
      executeAuthorizedMethod,
      AppsApi.loadApps(),
    )
    yield put(loadAppsSuccess(data.categories))
  } catch (e) {
    console.error(e)
    yield put(loadAppsError())
    yield put(notifyErrorObject(e) as any)
  }
}

function* loadApp(app: string) {
  try {
    const data: ApiResponse.User.GetApp = yield call(
      executeAuthorizedMethod,
      AppsApi.loadApp(app),
    )
    yield put(loadAppSuccess({ ...data, app }))
  } catch (e) {
    console.error(e)
    yield put(loadAppError(app))
    yield put(notifyErrorObject(e) as any)
  }
}

function* requestAuthMethod({
  payload,
}: {
  payload: AuthorizedMethodInternal<any>
}) {
  const user: UserState = yield select((state: AppState) => state.user)

  if (
    user.status !== 'loading' &&
    user.token &&
    user.tokenExpires - Date.now() > 500
  ) {
    payload(user.token, user.id)
  } else {
    yield put(queueAuthMethod(payload))
    yield put(authenticate())
  }
}

// Watchers

function* watchUpdateToken() {
  yield takeLeading(UserAction.AUTHENTICATE_REQUEST, function* () {
    const user: UserState = yield select((state: AppState) => state.user)
    // Prevent updating token that hasn't expired yet
    if (
      user.status !== 'loading' &&
      user.token &&
      user.tokenExpires - Date.now() > 500
    ) {
      return
    }

    yield call(updateToken)
  })
}

function* watchLoadApps() {
  yield takeLeading(UserAction.LOAD_APPS_REQUEST, loadApps)
}

function* watchExecuteAuthorizedMethod() {
  yield takeEvery(UserAction.REQUEST_AUTH_METHOD, requestAuthMethod as any)
}

function* watchLoadApp() {
  const loading: Record<string, true> = {}

  while (true) {
    const { payload: app } = yield take(UserAction.LOAD_APP_REQUEST)

    if (!(app in loading)) {
      loading[app] = true
      yield fork(function* () {
        yield call(loadApp, app)
        delete loading[app]
      })
    }
  }
}

export default function* userSaga() {
  while (true) {
    const channel: Channel<any> = yield actionChannel(
      ({ type }: { type: string }) => {
        return type.startsWith('USER/') && !type.startsWith('USER/AUTHENTICATE')
      },
    )

    const tokenTask = yield fork(updateToken)
    const action = yield take([
      UserAction.LOGOUT,
      UserAction.AUTHENTICATE_SUCCESS,
      UserAction.AUTHENTICATE_ERROR,
    ])

    if (action.type === UserAction.LOGOUT) {
      yield cancel(tokenTask)
      continue
    }

    const tasks: Task[] = yield all([
      fork(watchLoadApps),
      fork(watchLoadApp),
      fork(watchUpdateToken),
      fork(watchExecuteAuthorizedMethod),
    ])

    // Executing actions that may have started while authentication way being performed
    yield takeEvery(channel, function* (a) {
      yield put(a)
    })
    channel.close()

    yield take(UserAction.LOGOUT)
    yield* tasks.map((x) => cancel(x))
  }
}
