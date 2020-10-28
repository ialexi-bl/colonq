export interface Reducer<S> {
  (state: S, payload: any): S
}
export type ActionsMap<S> = {
  [type: string]: Reducer<S>
}

export default function createReducer<S>(
  actionsMap: ActionsMap<S>,
  initialState: S,
) {
  return (state: S = initialState, action: { type: string; payload: any }) => {
    if (action.type in actionsMap) {
      return actionsMap[action.type](state, payload)
    }
    return state
  }
}
