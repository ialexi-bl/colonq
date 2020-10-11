import { User } from './types'
import { createAction } from 'redux-act'

export const authenticate = createAction<User>('Authenticate user')
export const unauthenticate = createAction('Unauthenticate user')
