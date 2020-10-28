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
} & AppsState

export type AppsState = {
  appsStatus: 'none' | 'loading' | 'error' | 'loaded'
  appsList: string[]
  apps: Apps
}

export type Apps = Record<string, App>
export type App = {
  id: string
  icon: string
  score: number
  title: string
} & (
  | {
      status: 'only-info' | 'loading' | 'error'
      lessons: never[]
    }
  | {
      status: 'loaded' | 'loading' | 'error'
      lessons: Lesson[]
    }
)

export type Lesson = {
  id: string
  icon: string
  score: number
  title: string
  unlocked: boolean
}

export type UserState = User | EmptyUser
