import { ShapeSet } from './types'
import { createAction } from 'store/util'

export enum ShapesAction {
  REGISTER = 'SHAPES/REGISTER',
}

export const registerShape = createAction<ShapeSet>(ShapesAction.REGISTER)
