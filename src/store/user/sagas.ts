import { ApiErrorName, ApiResponse } from 'services/client/config'
import { AppState } from 'store/types'
import { AppsApi, UserApi } from 'services/api'
import { Channel, Task } from 'redux-saga'
import { HttpError } from 'services/errors'
import {
  UserAction,
  authenticateError,
  authenticateSuccess,
  loadAppError,
  loadAppSuccess,
  loadAppsError,
  loadAppsSuccess,
  unauthenticate,
} from './actions'
import { UserState } from './types'
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
import { executeAuthorizedMethod, executeMethod } from 'store/util'
import { notifyErrorObject } from 'store/view'

// Logic

function* updateToken() {
  try {
    const data: ApiResponse.Auth.Token = yield call(
      executeMethod,
      UserApi.fetchToken(),
    )
    yield put(authenticateSuccess(data))
  } catch (e) {
    if (e instanceof HttpError) {
      const name: string = yield call(e.getApiName)

      if (name === ApiErrorName.UNAUTHORIZED) {
        yield put(unauthenticate())
      }
    }
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
    yield put(loadAppsSuccess(data))
  } catch (e) {
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
    yield put(loadAppError(app))
    yield put(notifyErrorObject(e) as any)
  }
}

// Watchers

function* watchUpdateToken() {
  yield takeLeading(UserAction.AUTHENTICATE_REQUEST, function* () {
    const user: UserState = yield select((state: AppState) => state.user)
    // Prevent updating token that hasn't expired yet
    if (
      user.status === 'authenticated' &&
      user.tokenExpires > Date.now() + 2000
    ) {
      return
    }

    yield call(updateToken)
  })
}

function* watchLoadApps() {
  yield takeLeading(UserAction.LOAD_APPS_REQUEST, loadApps)
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
    const channel: Channel<any> = yield actionChannel('USER/*')
    take(UserAction.AUTHENTICATE_REQUEST)

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
      fork(updateToken),
      fork(watchUpdateToken),
    ])
    // Executing actions that may have started while authentication way being performed
    yield takeEvery(channel, put)
    channel.close()

    yield take(UserAction.LOGOUT)
    yield* tasks.map((x) => cancel(x))
  }
}
