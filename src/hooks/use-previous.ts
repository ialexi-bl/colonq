import { useEffect, useRef } from 'react'

/**
 * Returns the value that the variable
 * had during previous render
 * @param value
 */
export default function usePrevious<T>(value: T): T {
  const ref = useRef<T>(value)
  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
