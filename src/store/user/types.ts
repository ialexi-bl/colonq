export const FETCH_USER_SUCCESS = 'USER/FETCH_SUCCESS'

export type User = {
  providers: string[]
  username: string
  email: string
  id: string
}
export type EmptyUser = {
  providers: never[]
  username: null
  email: null
  id: null
}

export type UserState =
  | (User & { status: 'authenticated' })
  | (EmptyUser & { status: 'loading' | 'unauthenticated' })
