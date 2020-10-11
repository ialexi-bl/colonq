/* eslint-disable camelcase */

namespace ProviderResponses {
  export type Google = {
    state: 'google'
    scope: string
    access_token: string
    token_type: string
    expires_in: string
    authuser: string
    prompt: string
  }
  export type Vk = {
    state: 'vk'
    access_token: string
    expires_in: string
    user_id: string
    email: string
  }
}
export default ProviderResponses
