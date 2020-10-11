import { REGISTER_SHAPE, Shape, ShapesActions } from './types'
import { createAction } from 'redux-act'

export const registerShape = createAction<Shape>(
  'Adds shape to DOM to be used in components that need it',
)
