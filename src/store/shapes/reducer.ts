import { REGISTER_SHAPE, ShapesAction, ShapesState } from './types'

export const initialState: ShapesState = []

export default function reducer(
  state: ShapesState = initialState,
  action: ShapesAction,
) {
  switch (action.type) {
    case REGISTER_SHAPE:
      return state.find((shape) => shape.name === action.payload.name)
        ? state
        : state.concat(action.payload)
    default:
      return state
  }
}
