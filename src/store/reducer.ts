import { History } from 'history'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authReducer from './user'
import svgReducer from './shapes'
import viewReducer from './view'

export const createRootReducer = (history: History) =>
  combineReducers({
    shapes: svgReducer,
    user: authReducer,
    view: viewReducer,
    router: connectRouter(history),
  })
