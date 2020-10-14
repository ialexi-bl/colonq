export const FETCH_USER_SUCCESS = 'USER/FETCH_SUCCESS'

/**
 * State with user information
 */
export type User = {
  /** Access JWT token */
  token: string
  /** Token expiry time in **milliseconds** */
  tokenExpires: number
  /** List of providers linked to the account */
  providers: string[]
  username: string
  email: string
  id: string
}
/**
 * State for unauthenticated user
 */
export type EmptyUser = {
  /** Access JWT token */
  token: null
  /** Token expiry time in **milliseconds** */
  tokenExpires: null
  /** List of providers linked to the account */
  providers: never[]
  username: null
  email: null
  id: null
}

export type UserState =
  | (User & { status: 'authenticated' })
  | (EmptyUser & { status: 'loading' | 'unauthenticated' })
