import { useReducer } from 'react'

type ToggleList = Record<string, true>
const reducer = (chosen: ToggleList, app: string | ToggleList) => {
  if (typeof app === 'string') {
    const newState = { ...chosen }
    if (newState[app]) delete newState[app]
    else newState[app] = true
    return newState
  } else {
    return { ...chosen, ...app }
  }
}

/**
 * Provides a way to toggle multiple boolean values
 * Returns an object whose keys are values which are
 * turned on and a function to toggle on or multiple options at a time
 */
export default function useItemsToggler(
  initialize?: () => ToggleList,
): [ToggleList, (value: string | ToggleList) => void] {
  // This has some issues without casting to any
  // probably because `initialize` may be `undefined` or may not
  return useReducer(reducer, {}, initialize as any)
}
