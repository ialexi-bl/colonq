import { useRef } from 'react'

/**
 * Returns the value from last render that doesn't equal current one
 * @param value
 */
export default function useDifferentPrevious<T>(
  value: T,
  compare = (a: T, b: T) => a === b,
) {
  const ref = useRef<T>(value)
  const buf = useRef<T>(value)

  if (!compare(buf.current, value)) {
    ref.current = buf.current
    buf.current = value
  }

  return ref.current
}
