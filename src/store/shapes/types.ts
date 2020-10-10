export const REGISTER_SHAPE = 'SHAPES/REGISTER'

export type Shape = {
  name: string
  paths: string[]
}
export type ShapesState = Shape[]

export type ShapesActions = {
  REGISTER_SHAPE: {
    type: typeof REGISTER_SHAPE
    payload: Shape
  }
}
export type ShapesAction = ShapesActions[keyof ShapesActions]
