import { RouteOptions, Routes } from './types'
import Config from '../index'
import appsRoutes from './apps-routes'

export const routesArray: RouteOptions[] = [
  {
    path: '/',
    name: 'index',
    getComponent: () => import('components/pages/Index'),
  },
  {
    path: '/apps/edit',
    name: 'appsChoice',
    getComponent: () => import('components/pages/AppsChoice'),
  },
  {
    path: '/apps',
    name: 'appsList',
    getComponent: () => import('components/pages/AppsList'),
  },
  {
    path: '/auth',
    name: 'auth',
    getComponent: () => import('components/pages/Auth'),
  },
  {
    path: '/resend-email',
    name: 'resendEmail',
    getComponent: () => import('components/pages/ResendEmail'),
  },
  {
    path: '/feedback',
    name: 'feedback',
    getComponent: () => import('components/pages/Feedback'),
  },
  {
    path: '/profile',
    name: 'profile',
    getComponent: () => import('components/pages/Profile'),
  },
  {
    path: '/profile/edit/password',
    name: 'editPassword',
    getComponent: () => import('components/pages/EditPassword'),
  },
  {
    path: '/login',
    name: 'login',
    getComponent: () => import('components/pages/Login'),
  },
  {
    path: '/register',
    name: 'register',
    getComponent: () => import('components/pages/Registration'),
  },
  {
    path: '/password/reset',
    name: 'resetPassword',
    getComponent: () => import('components/pages/ResetPassword'),
  },
  ...appsRoutes,
]

export const routes: Routes = {}
for (const route of routesArray) {
  if (Config.IS_DEV && (route.name in routes || route.path in routes)) {
    console.warn(`Duplicate name or path "${route.name}: ${route.path}"`)
  }
  routes[route.name] = routes[route.path] = route
}

export const resetPassword = (): string => routes.resetPassword.path
export const editPassword = (): string => routes.editPassword.path
export const verifyEmail = (): string => routes.verifyEmail.path
export const appsChoice = (): string => routes.appsChoice.path
export const appsList = (): string => routes.appsList.path
export const feedback = (): string => routes.feedback.path
export const settings = (): string => routes.settings.path
export const register = (): string => routes.register.path
export const profile = (): string => routes.profile.path
export const login = (): string => routes.login.path
export const index = (): string => routes.index.path
export const auth = (): string => routes.auth.path
export const app = (id: string, path?: string): string =>
  `/app/${id}${path ? '/' + path : ''}`
