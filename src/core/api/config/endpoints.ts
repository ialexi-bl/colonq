import { SocialAction } from './verification-action'
import { createUrl } from 'util/create-url'
import { joinUrl } from 'util/join-url'
import Config from 'config'

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || ''
const VK_CLIENT_ID = process.env.REACT_APP_VK_OAUTH_CLIENT_ID || ''

const GOOGLE_OAUTH_ENPOINT = 'https://accounts.google.com/o/oauth2/v2/auth'
const VK_OAUTH_ENDPOINT = 'https://oauth.vk.com/authorize'
const EMAIL_SCOPE = 'https://www.googleapis.com/auth/userinfo.email'
const PROFILE_SCOPE = 'https://www.googleapis.com/auth/userinfo.profile'

/**
 * Other API endpoints
 */
const general = {
  feedback: 'feedback',
  log: 'log/error',
}

/**
 * Apps session API endpoints
 */
const session = {
  lesson: (app: string, lesson: string): string => `session/${app}/${lesson}`,
  appPractice: (app: string): string => `session/${app}/practice`,
  submitAnswers: (app: string): string => `session/${app}/answer`,
}

/**
 * Notifications subscription
 */
const subscription = 'subscription'

/**
 * Apps settings
 */
const settings = {
  get: (app: string): string => `settings/${app}`,
  set: (app: string): string => `settings/${app}`,
}

/**
 * User data
 */
const user = {
  getById: (id: string): string => `user/${id}`,
  getByEmail: (email: string): string =>
    `user/email/${encodeURIComponent(email)}`,

  setEmail: (id: string): string => `user/${id}/email`,
  setUsername: (id: string): string => `user/${id}/username`,
  setPassword: (id: string): string => `user/${id}/password`,
  getPasswordUpdateOptions: (id: string): string =>
    `user/${id}/password/update-options`,

  getApps: (id: string): string => `user/${id}/apps`,
  setApps: (id: string): string => `user/${id}/apps`,

  getApp(id: string, category: string, name?: string): string {
    const app = name ? `${category}/${name}` : category
    return `user/${id}/app/${app}`
  },
}

/**
 * Apps data
 */
const apps = {
  get: 'apps',
}

/**
 * Authentication endpoints
 */
const auth = {
  self: 'auth/self',
  logout: 'auth/logout',
  verifyEmail: 'auth/verify-email',
  resendEmail: 'auth/resend-email',
  resetPassword: 'auth/reset-password',
  resetPasswordSubmit: 'auth/reset-password/submit',
  resetPasswordValidate: 'auth/reset-password/validate-token',

  register: 'auth/register',
  registerGoogle: 'auth/google/register',
  registerVk: 'auth/vk/register',
  registerVkWithEmail: 'auth/vk/register/with-email',

  login: 'auth/login',
  loginGoogle: 'auth/google/login',
  loginVk: 'auth/vk/login',

  linkGoogle: 'auth/google/link',
  linkVk: 'auth/vk/link',
}

const redirectUri = joinUrl(Config.APP_URL, 'auth')
/**
 * Redirect addresses for social login
 */
const oauth = {
  editPasswordGoogle: socialUrl('google', 'editPassword'),
  editPasswordVk: socialUrl('vk', 'editPassword'),
  registerGoogle: socialUrl('google', 'register'),
  registerVk: socialUrl('vk', 'register'),
  loginGoogle: socialUrl('google', 'login'),
  loginVk: socialUrl('vk', 'login'),
  linkGoogle: socialUrl('google', 'link'),
  linkVk: socialUrl('vk', 'link'),
}

function socialUrl(
  provider: 'vk' | 'google',
  type: 'login' | 'register' | 'link' | 'editPassword',
) {
  const uri =
    // provider === 'google' && Config.IS_DEV
    // ? 'https://aaaaaaaaaaaaaaaaaaaaaaaaa.com/auth'
    redirectUri
  return createUrl(
    { vk: VK_OAUTH_ENDPOINT, google: GOOGLE_OAUTH_ENPOINT }[provider],
    {
      scope: {
        vk: 'email',
        google: `${EMAIL_SCOPE} ${PROFILE_SCOPE}`,
      }[provider],
      client_id: {
        vk: VK_CLIENT_ID,
        google: GOOGLE_CLIENT_ID,
      }[provider],
      redirect_uri: uri,
      response_type: 'code',
      state: JSON.stringify({
        provider,
        redirectUri: uri,
        action: {
          link: SocialAction.SOCIAL_LINK,
          login: SocialAction.SOCIAL_LOGIN,
          register: SocialAction.SOCIAL_REGISTER,
          editPassword: SocialAction.SOCIAL_EDIT_PASSWORD,
        }[type],
      }),
    },
  )
}

const Endpoint = {
  general,
  session,
  subscription,
  settings,
  user,
  apps,
  auth,
  oauth,
}
export default Endpoint
