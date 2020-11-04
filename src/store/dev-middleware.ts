import { Middleware, applyMiddleware as applyReduxMiddleware } from 'redux'
import { ShapesAction } from './shapes'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'

const composeEnhancers = composeWithDevTools({})

const hiddenActions = {
  [ShapesAction.REGISTER]: 1,
}
const logger = createLogger({
  collapsed: true,
  predicate: (_, action) => !(action.type in hiddenActions),
})

export const applyMiddleware = (...middlewares: Middleware[]) =>
  composeEnhancers(applyReduxMiddleware(...middlewares, logger))
