import { createUrl } from 'util/create-url'
import { joinUrl } from 'util/join-url'

namespace Endpoints {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || ''
  const VK_CLIENT_ID = process.env.REACT_APP_VK_OAUTH_CLIENT_ID || ''

  const GOOGLE_OAUTH_ENPOINT = 'https://accounts.google.com/o/oauth2/v2/auth'
  const VK_AUTH_ENDPOINT = 'https://oauth.vk.com/authorize'
  const EMAIL_SCOPE = 'https://www.googleapis.com/auth/userinfo.email'
  const PROFILE_SCOPE = 'https://www.googleapis.com/auth/userinfo.profile'

  /**
   * Other API endpoints
   */
  export const Api = {
    feedback: 'feedback',
    logError: 'log/error',
  }

  /**
   * Apps session API endpoints
   */
  export const Session = {
    // TODO: add endpoint
  }

  /**
   * Authentication endpoints
   */
  export const Auth = {
    token: 'auth/token',
    logout: 'auth/logout',
    verifyEmail: 'auth/verify-email',
    register: {
      password: 'auth/register',
      google: 'auth/google/register',
      vk: 'auth/vk/register',
      vkWithEmail: 'auth/vk/register/with-email',
    },
    login: {
      password: 'auth/login',
      google: 'auth/google/login',
      vk: 'auth/vk/login',
    },
    link: {
      google: 'auth/google/link',
      vk: 'auth/vk/link',
    },
  }

  /**
   * Redirect addresses for social login
   */
  export const OAuth = {
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
export default Endpoints
