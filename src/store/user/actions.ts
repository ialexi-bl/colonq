import { App, Lesson, User } from './types'
import { createAction } from 'redux-act'

export const authenticate = createAction<Omit<User, 'appsList' | 'apps'>>(
  'Authenticate user',
)
export const unauthenticate = createAction('Unauthenticate user')

export const addApps = createAction<Omit<App, 'loaded' | 'lessons'>[]>(
  'Add apps list',
)
export const addAppDetails = createAction<{
  app: string
  lessons: Lesson[]
}>('Add application')
