import { useRef } from 'react'

/**
 * Returns the first value from one of the previous
 * renders that doesn't equal current one
 * @param value
 */
export default function useDifferentPrevious<T>(
  value: T,
  equal = (a: T, b: T) => a === b,
): T {
  const ref = useRef<T>(value)
  const buf = useRef<T>(value)

  if (!equal(buf.current, value)) {
    ref.current = buf.current
    buf.current = value
  }

  return ref.current
}
