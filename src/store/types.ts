import { Action } from 'redux'
import { ThunkAction as IThunkAction, ThunkDispatch } from 'redux-thunk'
import { createRootReducer } from './reducer'

export type AppState = ReturnType<ReturnType<typeof createRootReducer>>
export type MixedDispatch = ThunkDispatch<AppState, any, Action>
export type ThunkAction<R = void> = IThunkAction<R, AppState, void, Action>
