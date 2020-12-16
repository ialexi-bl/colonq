import { useReducer } from 'react'

const reducer = (s: number) => s + 1
/**
 * Returns a function that forces component to update
 */
export default function useForceUpdate(): () => void {
  return useReducer(reducer, 0)[1]
}
