import { useReducer } from 'react'

const reducer = (s: number) => s + 1
export default function useForceUpdate() {
  const [, set] = useReducer(reducer, 0)
  return set
}
