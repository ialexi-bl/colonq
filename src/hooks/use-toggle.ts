import { useReducer } from 'react'

const reducer = (state: boolean) => !state
export default function useToggle(defaultValue: boolean = false) {
  return useReducer(reducer, defaultValue)
}
