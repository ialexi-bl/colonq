import { REGISTER_SHAPE, ShapesActions } from './types'

export const registerShape = (
  name: string,
  paths: string[],
): ShapesActions['REGISTER_SHAPE'] => ({
  type: REGISTER_SHAPE,
  payload: { name, paths },
})
