import { Shape, registerShape } from 'store/shapes'
import { useDispatch } from 'react-redux'
import { useLayoutEffect } from 'react'

export default function useClipShape(name: string, paths: Shape[]) {
  const dispatch = useDispatch()

  // Using layoutEffect because otherwise there's a moment
  // when shape is not loaded but the element is displayed
  useLayoutEffect(() => {
    dispatch(registerShape({ name, shapes: paths }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
