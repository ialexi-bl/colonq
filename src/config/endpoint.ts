import { createUrl } from 'util/create-url'
import { joinUrl } from 'util/join-url'

namespace Endpoint {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || ''
  const VK_CLIENT_ID = process.env.REACT_APP_VK_OAUTH_CLIENT_ID || ''

  const GOOGLE_OAUTH_ENPOINT = 'https://accounts.google.com/o/oauth2/v2/auth'
  const VK_AUTH_ENDPOINT = 'https://oauth.vk.com/authorize'
  const EMAIL_SCOPE = 'https://www.googleapis.com/auth/userinfo.email'
  const PROFILE_SCOPE = 'https://www.googleapis.com/auth/userinfo.profile'

  /**
   * Other API endpoints
   */
  export const api = {
    feedback: 'feedback',
    logError: 'log/error',
  }

  /**
   * Apps session API endpoints
   */
  export const session = {
    // TODO: add endpoint
  }

  /**
   * User data
   */
  export const user = {
    getById: (id: string) => `user/${id}`,
    getByEmail: (email: string) => `user/email/${email}`,

    setEmail: (id: string) => `user/${id}/email`,
    setUsername: (id: string) => `user/${id}/username`,
    setPassword: (id: string) => `user/${id}/password`,
    getPasswordUpdateOptions: (id: string) =>
      `user/${id}/password/update-options`,
  }

  /**
   * Authentication endpoints
   */
  export const auth = {
    token: 'auth/token',
    logout: 'auth/logout',
    verifyEmail: 'auth/verify-email',
    restorePassword: 'auth/restore-password',

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

  /**
   * Redirect addresses for social login
   */
  export const oauth = {
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
  }
}
export default Endpoint
