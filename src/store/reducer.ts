import { History } from 'history'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import appDataReducer from './app-data'
import authReducer from './auth'
import svgReducer from './shapes'
import viewReducer from './view'

export const createRootReducer = (history: History) =>
  combineReducers({
    shapes: svgReducer,
    auth: authReducer,
    view: viewReducer,
    appData: appDataReducer,
    router: connectRouter(history),
  })
