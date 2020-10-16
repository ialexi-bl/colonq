import { Shape, registerShape } from 'store/shapes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default function useClipShape(name: string, paths: Shape[]) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(registerShape({ name, shapes: paths }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
