import { useReducer } from 'react'

const reducer = (s: number) => s + 1
export default function useForceUpdate() {
  return useReducer(reducer, 0)[1]
}
