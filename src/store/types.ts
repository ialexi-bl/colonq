import { AppDataAction } from './app-data'
import { AuthAction } from './auth'
import { CallHistoryMethodAction } from 'connected-react-router'
import { ThunkAction as IThunkAction, ThunkDispatch } from 'redux-thunk'
import { ViewAction } from './view'
import { createRootReducer } from './reducer'

export type Action =
  | AuthAction
  | ViewAction
  | CallHistoryMethodAction
  | AppDataAction

export type AppState = ReturnType<ReturnType<typeof createRootReducer>>
export type MixedDispatch = ThunkDispatch<AppState, any, Action>
export type ThunkAction<R = void> = IThunkAction<R, AppState, void, Action>
