import { useRef } from 'react'

/**
 * Returns "true" if predicate has ever been truthy
 * @param predicate
 */
export default function useWasTrue(predicate: unknown): boolean {
  const fired = useRef(false)
  if (predicate) fired.current = true
  return fired.current
}
