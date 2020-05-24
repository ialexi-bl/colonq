import { Endpoints } from './endpoints'

/* eslint-disable camelcase */
export type ProviderResponses = {
  google: {
    state: 'google'
    scope: string
    access_token: string
    token_type: string
    expires_in: string
    authuser: string
    prompt: string
  }
  vk: {
    state: 'vk'
    access_token: string
    expires_in: string
    user_id: string
    email: string
  }
}
export type ProviderResponse = ProviderResponses[keyof ProviderResponses]
/* eslint-enable camelcase */

export const getProviderUrl = (data: ProviderResponse) => {
  switch (data.state) {
    case 'google':
      return {
        path: Endpoints.Auth.providers.google,
        body: {
          accessToken: data.access_token,
        },
      }
    case 'vk':
      return {
        path: Endpoints.Auth.providers.vk,
        body: {
          id: data.user_id,
          email: data.email,
        },
      }
    default:
      return null
  }
}
