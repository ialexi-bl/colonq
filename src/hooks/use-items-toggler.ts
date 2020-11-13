import { useReducer } from 'react'

const reducer = (chosen: Record<string, true>, app: string) => {
  const newState = { ...chosen }
  if (newState[app]) delete newState[app]
  else newState[app] = true
  return newState
}

/**
 * Returns object which has options that has been toggled on
 * and function to toggle particular items
 */
export default function useItemsToggler(
  initialize?: () => Record<string, true>,
) {
  // No idea why this doesn't type correctly
  return useReducer(reducer, {}, initialize as any)
}
