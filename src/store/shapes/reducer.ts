import { Shape, ShapeSet, ShapesState } from './types'
import { createReducer } from 'store/util'
import { registerShape } from './actions'

function normalizeName(setName: string, shapeName: string) {
  return `shape-${setName}${shapeName && '-' + shapeName}`
}

export default createReducer<ShapesState>(
  {
    [String(registerShape)]: (
      state,
      { setName, shapes }: ShapeSet,
    ): ShapesState => {
      return state.concat(
        shapes
          .map((shape) => {
            const name = normalizeName(setName, shape.name)
            if (state.find((shape) => shape.name === name)) {
              return null
            } else {
              return { name, shape: shape.shape }
            }
          })
          .filter((Boolean as any) as (x: any) => x is Shape),
      )
      // shapes.forEach(({ type, shape, name: shapeName }) => {
      //   const name = normalizeName(setName, shapeName)
      //   if (type === 'svg') {
      //     if (state.svg.find((x) => x.name === name)) return
      //     state.svg.push({ name, path: shape })
      //   } else {
      //     if (state.inline.find((x) => x.name === name)) return
      //     state.inline.push({ name, path: shape })
      //   }
      // })
      // return { ...state }
    },
  },
  [],
)
