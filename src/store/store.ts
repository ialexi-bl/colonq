import { History, createBrowserHistory } from 'history'
import { applyMiddleware, createStore as createReduxStore } from 'redux'
import { createRootReducer } from './reducer'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import thunk from 'redux-thunk'

function createStore(history: History) {
  const router = routerMiddleware(history)
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [router, thunk, sagaMiddleware]

  const store = createReduxStore(
    createRootReducer(history),
    process.env.NODE_ENV !== 'production'
      ? require('./dev-middleware').applyMiddleware(...middlewares)
      : applyMiddleware(...middlewares),
  )
  sagaMiddleware.run(rootSaga)

  return store
}

export const history = createBrowserHistory()
export const store = createStore(history)
