import { Shape, registerShape } from 'store/shapes'
import { useDispatch } from 'react-redux'
import { useLayoutEffect } from 'react'

/**
 * Registers an SVG clip path that can be used in CSS
 * `clip-path` property to shape elements
 * IDs of resulting clip paths look like this:
 * 1. For shapes that don't have `name` attribute in svg:
 *    shape-${name}
 * 2. For ones that have `shapeName` value in `name` attribute in svg:
 *    shape-${name}-${shapeName}
 * @param name - Shape name that will be used in CSS
 * @param paths - Path list imported from .shape.svg file
 * @example
 * In component:
 *   import paths from './bubble.shape.svg'
 *   useClipShape('bubble', paths)
 *
 * In CSS provided there is an SVG path with name `outer-1` in `bubble.shape.svg`:
 *   clip-path: url(#shape-bubble-outer-1)
 */
export default function useClipShape(name: string, paths: Shape[]) {
  const dispatch = useDispatch()

  // Using layoutEffect because otherwise there's a moment
  // when shape is not loaded but the element is displayed
  useLayoutEffect(() => {
    dispatch(registerShape({ name, shapes: paths }))
  }, [dispatch, name, paths])
}
