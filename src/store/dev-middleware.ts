import { Middleware, applyMiddleware as applyReduxMiddleware } from 'redux'
import { ShapesAction } from './shapes'
import { ViewAction } from './view'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'

const composeEnhancers = composeWithDevTools({})

const logger = createLogger({
  collapsed: true,
  predicate: (_, action) => {
    if (action.type === ShapesAction.REGISTER) return false
    if (action.type === ViewAction.SET_ELEVATION) return true
    if (action.type.startsWith('VIEW')) return false
    return true
  },
})

export const applyMiddleware = (...middlewares: Middleware[]) =>
  composeEnhancers(applyReduxMiddleware(...middlewares, logger))
