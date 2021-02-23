import { all, fork } from 'redux-saga/effects'
import userSaga from './user/sagas'

export default function* rootSaga(): Generator {
  yield all([fork(userSaga)])
}
