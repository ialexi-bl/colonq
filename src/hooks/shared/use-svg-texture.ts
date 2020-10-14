import { registerShape } from 'store/shapes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default function useClipShape(name: string, paths: string[]) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(registerShape({ name, paths }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
