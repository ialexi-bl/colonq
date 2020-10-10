import { NotFound } from 'components/pages/NotFound'
import { RouteComponentProps } from 'react-router'
import { RouteOptions, Routes } from './types'
import { appsMap } from 'config/apps-map'
import React, { lazy } from 'react'

export const routesArray: RouteOptions[] = [
  {
    path: '/',
    name: 'index',
    component: lazy(() => import('components/pages/Index')),
  },
  {
    path: '/list',
    name: 'list',
    component: lazy(() => import('components/pages/List')),
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
    performsInitialization: true,
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
    component: lazy(() => import('components/pages/ProfileUser')),
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
  {
    path: '/verify-email',
    name: 'verifyEmail',
    component: lazy(() => import('components/pages/VerifyEmail')),
    performsInitialization: true,
  },
  {
    path: '/app/:path*',
    name: 'app',
    render: ({
      match,
    }: RouteComponentProps<{
      path: string
    }>) => {
      const app = `/${match.params.path}`
      const info = appsMap[app]

      if (!info?.leaf) {
        return <NotFound />
      }

      let Component = cache[app]
      if (!Component) {
        Component = cache[app] = lazy(info.loadComponent)
      }

      return <Component />
    },
  },
]

export const routes: Routes = {}
for (const route of routesArray) {
  routes[route.name] = routes[route.path] = route
}

const cache: {
  [key: string]: React.ComponentType
} = {}

export const verifyEmail = () => routes.verifyEmail.path
export const feedback = () => routes.feedback.path
export const settings = () => routes.settings.path
export const register = () => routes.register.path
export const profile = () => routes.profile.path
export const login = () => routes.login.path
export const index = () => routes.index.path
export const list = () => routes.list.path
export const auth = () => routes.auth.path
export const app = (location: string) =>
  `/app${location[0] === '/' ? location : `/${location}`}`
