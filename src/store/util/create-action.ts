type Action<T> = { type: string; payload: T; error: boolean }

export interface ActionCreator<T> {
  type: string
  (payload: T): Action<T>
}

export function createAction<T = void>(type: string): ActionCreator<T> {
  const creator: ActionCreator<T> = (payload: T) => ({
    type,
    payload,
    error: payload instanceof Error,
  })
  creator.type = type
  creator.toString = () => type
  return creator
}

export function createAsyncAction<T>(type: string): AsyncActionCreator<T> {}
