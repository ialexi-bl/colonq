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
  appsList: string[]
  apps: Apps
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
  appsList: never[]
  apps: null
  id: null
}

export type Apps = Record<string, App>
export type App = {
  id: string
  icon: string
  score: number
  title: string
  loaded: boolean
} & (
  | {
      loaded: false
      lessons: never[]
    }
  | {
      loaded: true
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

export type AuthUserState = User & {
  status: 'authenticated'
}
export type EmptyUserState = EmptyUser & {
  status: 'loading' | 'unauthenticated'
}

export type UserState = AuthUserState | EmptyUserState
