import { useEffect, useRef } from 'react'

export function useWillUnmount(callback: () => unknown) {
  const handler = useRef(callback)
  handler.current = callback

  useEffect(
    () => () => {
      handler.current()
    },
    [],
  )
}
