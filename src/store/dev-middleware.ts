import { Middleware, applyMiddleware as applyReduxMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'

const composeEnhancers = composeWithDevTools({})

const logger = createLogger({
  collapsed: true,
})

export const applyMiddleware = (...middlewares: Middleware[]) =>
  composeEnhancers(applyReduxMiddleware(...middlewares, logger))
