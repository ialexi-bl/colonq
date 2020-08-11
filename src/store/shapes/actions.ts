import { REGISTER_SHAPE, ShapesAction } from './types'

export const registerShape = (name: string): ShapesAction['LOAD_SVG'] => ({
  type: REGISTER_SHAPE,
  payload: name,
})
