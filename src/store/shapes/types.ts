export const REGISTER_SHAPE = 'SHAPES/REGISTER'

export type Shape = {
  name: string
  shape: string
}
export type ShapeSet = {
  name: string
  shapes: Shape[]
}
export type ShapesState = ShapeSet[]
