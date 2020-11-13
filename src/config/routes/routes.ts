import { RouteOptions, Routes } from './types'
import { lazy } from 'react'
import appsRoutes from './apps-routes'

export const routesArray: RouteOptions[] = [
  {
    path: '/',
    name: 'index',
    component: lazy(() => import('components/pages/Index')),
  },
  {
    path: '/apps/edit',
    name: 'appsChoice',
    component: lazy(() => import('components/pages/AppsChoice')),
  },
  {
    path: '/apps',
    name: 'appsList',
    component: lazy(() => import('components/pages/AppsList')),
  },
  {
    path: '/settings',
    name: 'settings',
    component: lazy(() => import('components/pages/Settings')),
  },
  {
    path: '/auth',
    name: 'auth',
    component: lazy(() => import('components/pages/Auth')),
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: lazy(() => import('components/pages/Feedback')),
  },
  {
    path: '/profile',
    name: 'profile',
    authenticated: true,
    component: lazy(() => import('components/pages/Profile')),
  },
  {
    path: '/login',
    name: 'login',
    authenticated: false,
    component: lazy(() => import('components/pages/Login')),
  },
  {
    path: '/register',
    name: 'register',
    authenticated: false,
    component: lazy(() => import('components/pages/Registration')),
  },
  ...appsRoutes,
]

export const routes: Routes = {}
for (const route of routesArray) {
  routes[route.name] = routes[route.path] = route
}

export const verifyEmail = () => routes.verifyEmail.path
export const appsChoice = () => routes.appsChoice.path
export const appsList = () => routes.appsList.path
export const feedback = () => routes.feedback.path
export const settings = () => routes.settings.path
export const register = () => routes.register.path
export const profile = () => routes.profile.path
export const login = () => routes.login.path
export const index = () => routes.index.path
export const auth = () => routes.auth.path
export const app = (id: string, path?: string) =>
  `/app/${id}${path ? '/' + path : ''}`
