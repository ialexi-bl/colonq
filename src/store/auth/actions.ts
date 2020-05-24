import { AUTHENTICATE, AuthActions } from './types'
import { User } from 'services/client'

export const authenticate = (payload: User): AuthActions['AUTHENTICATE'] => ({
  type: AUTHENTICATE,
  payload,
})
export const unauthenticate = (): AuthActions['AUTHENTICATE'] => ({
  type: AUTHENTICATE,
  payload: null,
})
