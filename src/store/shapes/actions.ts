import { ShapeSet } from './types'
import { createAction } from 'redux-act'

export const registerShape = createAction<ShapeSet>(
  'Adds shape to DOM to be used in components that need it',
)
