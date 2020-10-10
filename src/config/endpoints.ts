import { createUrl } from 'util/create-url'
import { joinUrl } from 'util/join-url'

// === Providers data ===

export type AuthProvider = 'google' | 'vk'

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || ''
const VK_CLIENT_ID = process.env.REACT_APP_VK_OAUTH_CLIENT_ID || ''

const GOOGLE_OAUTH_ENPOINT = 'https://accounts.google.com/o/oauth2/v2/auth'
const VK_AUTH_ENDPOINT = 'https://oauth.vk.com/authorize'
const EMAIL_SCOPE = 'https://www.googleapis.com/auth/userinfo.email'
const PROFILE_SCOPE = 'https://www.googleapis.com/auth/userinfo.profile'

const noSlash = (path: string) => (path.startsWith('/') ? path.slice(1) : path)
// === Services URLs ===

// export type ProviderServices = { [key in AuthProvider]: string }

export const Endpoints = {
  // API endpoints
  Api: {
    feedback: 'feedback',
    logError: 'log/error',
  },
  AppData: {
    listen: 'app-data/listen',
    get: 'app-data',
    set: 'app-data',
    getterOf: (applet: string) => `${Endpoints.AppData.get}/${noSlash(applet)}`,
    setterOf: (applet: string) => `${Endpoints.AppData.set}/${noSlash(applet)}`,
  },

  // Authentication endpoints
  Auth: {
    login: 'auth/login',
    logout: 'auth/logout',
    register: 'auth/register',
    getToken: 'auth/token',
    sendEmail: 'auth/send-email',
    verifyEmail: 'auth/verify-email',
    providers: {
      google: 'auth/google',
      vk: 'auth/vk',
    },
  },
  /**
   * Addresses to redirect
   */

  OAuth: {
    google: createUrl(GOOGLE_OAUTH_ENPOINT, {
      redirect_uri: joinUrl(process.env.REACT_APP_API_URL!, 'auth/google'),
      scope: `${EMAIL_SCOPE} ${PROFILE_SCOPE}`,
      client_id: GOOGLE_CLIENT_ID,
      response_type: 'code',
    }),
    vk: createUrl(VK_AUTH_ENDPOINT, {
      redirect_uri: joinUrl(process.env.REACT_APP_API_URL!, 'auth/vk'),
      client_id: VK_CLIENT_ID,
      scope: 'email',
      response_type: 'code',
    }),
    link: {
      google: (token: string) =>
        createUrl(GOOGLE_OAUTH_ENPOINT, {
          redirect_uri: joinUrl(
            process.env.REACT_APP_API_URL!,
            'auth/link/google',
          ),
          state: token,
          scope: `${EMAIL_SCOPE} ${PROFILE_SCOPE}`,
          client_id: GOOGLE_CLIENT_ID,
          response_type: 'code',
        }),
      vk: (token: string) =>
        createUrl(VK_AUTH_ENDPOINT, {
          redirect_uri: joinUrl(process.env.REACT_APP_API_URL!, 'auth/link/vk'),
          state: token,
          client_id: VK_CLIENT_ID,
          scope: 'email',
          response_type: 'code',
        }),
    },
  },
}
