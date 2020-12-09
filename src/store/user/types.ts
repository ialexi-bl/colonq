import { MixedDispatch } from 'store/types'

export const FETCH_USER_SUCCESS = 'USER/FETCH_SUCCESS'

/**
 * State with user information
 */
export type User = {
  status: 'authenticated' | 'loading' | 'error'
  /** Access JWT token */
  token: string
  /** Token expiry time in **milliseconds** */
  tokenExpires: number
  /** List of providers linked to the account */
  providers: string[]
  username: string
  email: string
  id: string

  methodsQueue: AuthorizedMethodInternal<any>[]
} & AppsState
/**
 * State for unauthenticated user
 */
export type EmptyUser = {
  status: 'unauthenticated' | 'loading' | 'error' | 'none'
  /** Access JWT token */
  token: null
  /** Token expiry time in **milliseconds** */
  tokenExpires: null
  /** List of providers linked to the account */
  providers: never[]
  username: null
  email: null
  id: null

  methodsQueue: AuthorizedMethodInternal<any>[]
} & AppsState

export type AppsState = {
  appsStatus: 'none' | 'loading' | 'error' | 'loaded'
  categories: Category[]
  // TODO: remove this field if it's not needed anywhere
  appsList: string[]
  apps: Apps
}

export type AuthorizedMethodInternal<T> = {
  call: (token: string, id: string) => Promise<T>
  throw: (error: Error) => void
}
export type AuthorizedMethod<T> = (
  token: string,
  id: string,
  dispatch: MixedDispatch,
) => Promise<T>

export type Category = {
  id: string
  title: string
  apps: PlainApp[]
}

export type Apps = Record<string, App>
export type App = PlainApp &
  (
    | {
        status: 'only-info' | 'loading' | 'error'
        lessons: never[]
      }
    | {
        status: 'loaded' | 'loading' | 'error'
        lessons: Lesson[]
      }
  )
export type PlainApp = {
  id: string
  icon: string
  score: number
  title: string
}

export type Lesson = {
  id: string
  icon: string
  score: number
  title: string
  empty?: boolean
  unlocked: boolean
}

export type UserState = User | EmptyUser
