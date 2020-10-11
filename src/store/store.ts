import { History, createBrowserHistory } from 'history'
import { applyMiddleware, createStore as createReduxStore } from 'redux'
import { createRootReducer } from './reducer'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

function createStore(history: History) {
  const router = routerMiddleware(history)
  const middlewares = [router, thunk]

  const store = createReduxStore(
    createRootReducer(history),
    process.env.NODE_ENV !== 'production'
      ? require('./dev-middleware').applyMiddleware(...middlewares)
      : applyMiddleware(...middlewares),
  )

  return store
}

export const history = createBrowserHistory()
export const store = createStore(history)
