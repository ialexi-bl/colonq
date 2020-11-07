import { AppComponent, allowedCategories } from 'apps'
import { RouteComponentProps } from 'react-router'
import { RouteOptions, Routes } from './types'

import Config from 'config'
import EnsureAuthenticated from 'components/shared/EnsureAuthenticated'
import NotFound from 'components/pages/NotFound'
import React, { lazy } from 'react'

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
  {
    path: '/app/:category/:name/:path*',
    name: 'app',
    render: renderAppPage,
  },
]

export const routes: Routes = {}
for (const route of routesArray) {
  routes[route.name] = routes[route.path] = route
}

const cache: Record<string, AppComponent> = {}
function renderAppPage({
  match,
}: RouteComponentProps<{ category: string; name: string; path?: string }>) {
  const { category, name, path = '' } = match.params
  if (!(category in allowedCategories)) {
    return <NotFound />
  }

  const app = `${category}/${name}`
  const Component = (cache[app] ||= lazy(() =>
    import(`apps/${app}/index`).catch((e) => {
      if (Config.IS_DEV) console.warn(e)
      return { default: NotFound }
    }),
  ))

  // * Not putting suspense here, because suspense from route does the job
  return (
    <EnsureAuthenticated>
      <Component path={path} />
    </EnsureAuthenticated>
  )
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
