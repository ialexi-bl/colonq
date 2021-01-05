export const REGISTER_SHAPE = 'SHAPES/REGISTER'

export type Shape = {
  name: string
  shape: string
}
export type ShapeSet = {
  setName: string
  shapes: Shape[]
}
export type ShapesState = Shape[]
