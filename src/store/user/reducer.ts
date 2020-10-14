import { UserState } from './types'
import { authenticate, unauthenticate } from './actions'
import { createReducer } from 'redux-act'

export const initialState: UserState = {
  status: 'loading',
  token: null,
  tokenExpires: null,
  providers: [],
  username: null,
  email: null,
  id: null,
}

export default createReducer<UserState>(
  {
    [String(authenticate)]: (_, payload) => ({
      ...payload,
      status: 'loading',
    }),
    [String(unauthenticate)]: () => ({
      ...initialState,
      status: 'unauthenticated',
    }),
  },
  initialState,
)
