import { useReducer } from 'react'

const reducer = (state: boolean) => !state

/**
 * Stores a boolean state and provides a function to toggle it
 * @param defaultValue
 */
export default function useToggle(
  defaultValue: boolean = false,
): [boolean, () => void] {
  return useReducer(reducer, defaultValue)
}
