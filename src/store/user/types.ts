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
  apps: App[]
  title: string
}

export type Apps = Record<string, App>

export type App /* PlainApp */ = {
  id: string
  icon: string
  score: number
  title: string
  iconsSet: string
  hasSettings: boolean
}

export type UserState = User | EmptyUser
