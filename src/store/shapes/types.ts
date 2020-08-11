export const REGISTER_SHAPE = 'SHAPES/REGISTER'

export type ShapesState = string[]
export type ShapesActions = {
  LOAD_SVG: {
    type: typeof REGISTER_SHAPE
    payload: string
  }
}
export type ShapesAction = ShapesActions[keyof ShapesActions]
