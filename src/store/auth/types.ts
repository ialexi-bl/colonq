import { User } from 'services/client'

export const AUTHENTICATE = 'AUTHENTICATE'

export type AuthState =
  | {
      loading: false
      authenticated: true
      providers: string[]
      email: string
      name: string
      id: string
    }
  | {
      loading: boolean
      authenticated: false
      providers: string[]
      email: null
      name: null
      id: null
    }

export type AuthActions = {
  AUTHENTICATE: {
    type: typeof AUTHENTICATE
    payload: null | User
  }
}
export type AuthAction = AuthActions[keyof AuthActions]
