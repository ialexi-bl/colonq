import { Api } from 'core/api/config'
import { AppState } from 'store/types'
import { Channel, Task } from 'redux-saga'
import { ColonqError, HttpError } from 'core/errors'
import { User } from './types'
import {
  UserAction,
  authenticateError,
  authenticateStart,
  authenticateSuccess,
  loadAppError,
  loadAppSuccess,
  loadAppsError,
  loadAppsSuccess,
  unauthenticate,
} from './actions'
import {
  actionChannel,
  all,
  call,
  cancel,
  delay,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLeading,
} from 'redux-saga/effects'
import { notifyErrorObject } from 'store/view'
import AppsService from 'core/api/services/apps'
import AuthService from 'core/api/services/auth'

// Logic
function* getSelf(): Generator<unknown, any, any> {
  try {
    yield put(authenticateStart())
    const { data }: Api.Success<Api.Auth.Token> = yield call(
      AuthService.getSelf,
    )
    yield put(authenticateSuccess(data))
  } catch (e) {
    if (e instanceof HttpError) {
      if (e.status === 401) {
        yield put(unauthenticate())
        return
      }
      if (e.status === 429) {
        yield delay(500)
        yield call(getSelf)
        return
      }
    }

    yield put(authenticateError())
    yield put(notifyErrorObject(e) as any)
  }
}

function* loadApps() {
  const appsStatus: User['appsStatus'] = yield select(
    (state: AppState) => state.user.appsStatus,
  )
  if (appsStatus === 'loaded') return

  try {
    const data: Api.User.GetApps = yield call(AppsService.loadApps)
    yield put(loadAppsSuccess(data.categories))
  } catch (e) {
    yield put(loadAppsError())
    if (!(e instanceof ColonqError)) {
      yield put(notifyErrorObject(e) as any)
    }
  }
}

function* loadApp(app: string) {
  try {
    const data: Api.User.GetApp = yield call(AppsService.loadApp, app)
    yield put(loadAppSuccess({ ...data, app }))
  } catch (e) {
    console.error(e)
    yield put(loadAppError(app))
    if (!(e instanceof ColonqError)) {
      yield put(notifyErrorObject(e) as any)
    }
  }
}

// Watchers

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

export default function* userSaga(): Generator<unknown, any, any> {
  while (true) {
    const channel: Channel<any> = yield actionChannel(
      ({ type }: { type: string }) => {
        return type.startsWith('USER/') && !/USER\/(UN)?AUTHENTICATE/.test(type)
      },
    )

    const tokenTask = yield fork(getSelf)
    const action = yield take([
      UserAction.LOGOUT,
      UserAction.AUTHENTICATE_SUCCESS,
      UserAction.AUTHENTICATE_ERROR,
    ])

    if (action.type === UserAction.LOGOUT) {
      yield cancel(tokenTask)
      continue
    }

    const tasks: Task[] = yield all([fork(watchLoadApps), fork(watchLoadApp)])

    // Executing actions that may have started while authentication way being performed
    yield takeEvery(channel, function* (a) {
      yield put(a)
    })
    channel.close()

    yield take(UserAction.LOGOUT)
    yield* tasks.map((x) => cancel(x))
  }
}
