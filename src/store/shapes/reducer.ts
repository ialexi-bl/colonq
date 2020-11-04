import { ShapeSet, ShapesState } from './types'
import { createReducer } from 'store/util'
import { registerShape } from './actions'

export default createReducer<ShapesState>(
  {
    [String(registerShape)]: (state, payload: ShapeSet) => {
      if (state.find((x) => x.name === payload.name)) {
        return state
      }
      return state.concat(payload)
    },
  },
  [],
)
