import { useRef } from 'react'

/**
 * Returns "true" if predicate has been truthy at least once
 * @param predicate
 */
export default function useWasTrue(predicate: unknown): boolean {
  const fired = useRef(false)
  if (predicate) fired.current = true
  return fired.current
}
