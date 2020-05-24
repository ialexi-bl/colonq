import { AUTHENTICATE, AuthAction, AuthState } from './types'

export const initialState: AuthState = {
  authenticated: false,
  providers: [],
  loading: true,
  email: null,
  name: null,
  id: null,
}

export function reducer(
  state: AuthState = initialState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case AUTHENTICATE: {
      if (action.payload) {
        return {
          ...action.payload,
          authenticated: true,
          loading: false,
        }
      }
      return {
        authenticated: false,
        providers: [],
        loading: false,
        email: null,
        name: null,
        id: null,
      }
    }
    default:
      return state
  }
}
