import { ServerResponse } from 'response-types'

export type AuthenticateResponse = ServerResponse<
  'ok',
  {
    providers: string[]
    check: string
    token: string
    email: string
    name: string
    id: string
  }
>

export type SignupResponse = AuthenticateResponse
export type SignupError =
  | ServerResponse<'no-id'>
  | ServerResponse<'no-email', { id: string; provider: string }>

export type LogoutResponse = ServerResponse<'ok'>
export type SendEmailResponse = ServerResponse<'ok'>
export type VerifyEmailResponse = AuthenticateResponse
export type VerifyEmailError =
  | ServerResponse<'token-expired'>
  | ServerResponse<'token-invalid'>

export type JwtPayload = {
  id: string
  email: string
  /** Expiration time in seconds */
  exp: number
}

export const isJwtPayload = (obj: any): obj is JwtPayload =>
  obj &&
  typeof obj === 'object' &&
  typeof obj.id === 'string' &&
  typeof obj.email === 'string' &&
  typeof obj.exp === 'number'
