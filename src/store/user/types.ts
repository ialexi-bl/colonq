export const FETCH_USER_SUCCESS = 'USER/FETCH_SUCCESS'

/**
 * State with user information
 */
export type User = {
  status: 'authenticated' | 'loading' | 'error'
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
  /** List of providers linked to the account */
  providers: never[]
  username: null
  email: null
  id: null
} & AppsState

export type AppsState = {
  appsStatus: 'none' | 'loading' | 'error' | 'loaded'
  categories: Category[]
  appsList: string[]
  apps: Apps
}

export type Category = {
  id: string
  apps: PlainApp[]
  title: string
}

export type Apps = Record<string, App>

export type App = OnlyInfoApp | LoadedApp
export type OnlyInfoApp = PlainApp & {
  status: 'only-info' | 'loading' | 'error'
  iconsSet: string
  lessons: never[]
}
export type LoadedApp = PlainApp & {
  status: 'loaded' | 'loading' | 'error'
  iconsSet: string
  lessons: Lesson[]
}
export type PlainApp = {
  id: string
  icon: string
  score: number
  title: string
  hasSettings: boolean
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
