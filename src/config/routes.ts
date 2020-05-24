import { RouteProps } from 'react-router'
import { lazy } from 'react'

export function getRouteKey(path: string, authenticated: boolean) {
  if (path === profile()) return path + (authenticated ? '-user' : '-guest')
  return path
}

export const routes: Record<string, RouteProps> = {
  index: {
    path: '/',
    exact: true,
    component: lazy(() =>
      import('components/pages/Index').then((x) => ({ default: x.Index })),
    ),
  },
  app: {
    path: '/app/:path*',
    exact: true,
    component: lazy(() =>
      import('components/pages/Applet').then((x) => ({ default: x.Applet })),
    ),
  },
  auth: {
    path: '/auth',
    exact: true,
    component: lazy(() =>
      import('components/pages/Auth').then((x) => ({ default: x.Auth })),
    ),
  },
  feedback: {
    path: '/feedback',
    exact: true,
    component: lazy(() =>
      import('components/pages/Feedback').then((x) => ({
        default: x.Feedback,
      })),
    ),
  },
  user: {
    path: '/profile',
    exact: true,
    component: lazy(() =>
      import('components/pages/ProfileUser').then((x) => ({
        default: x.ProfileUser,
      })),
    ),
  },
  signin: {
    path: '/signin',
    exact: true,
    component: lazy(() =>
      import('components/pages/ProfileGuest').then((x) => ({
        default: x.ProfileGuest,
      })),
    ),
  },
  verifyEmail: {
    path: '/verify-email',
    exact: true,
    component: lazy(() =>
      import('components/pages/VerifyEmail').then((x) => ({
        default: x.VerifyEmail,
      })),
    ),
  },
}

export const verifyEmail = () => routes.verifyEmail.path as string
export const feedback = () => routes.feedback.path as string
export const profile = () => routes.user.path as string
export const signin = () => routes.signin.path as string
export const index = () => routes.index.path as string
export const auth = () => routes.auth.path as string
export const app = (location: string) =>
  '/app' + (location.startsWith('/') ? location : '/' + location)
