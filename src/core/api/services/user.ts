import { Api, ApiPromise, Endpoint } from '../config'
import { loadAppsSuccess } from 'store/user'
import ApiService from './api'
import AuthService from './auth'
import StoreController from 'store/StoreController'

const getId = StoreController.requireUserId

function setUsername(username: string): ApiPromise<Api.User.SetUsername> {
  return AuthService.authenticateAfterRequest(() =>
    ApiService.put<Api.User.SetUsername>(Endpoint.user.setUsername(getId()), {
      json: { username },
    }),
  )
}

function requestSetEmail(email: string): ApiPromise<Api.User.SetEmailRequest> {
  return ApiService.put<Api.User.SetEmailRequest>(
    // TODO: check if non-null assertion doesn't cause trouble
    Endpoint.user.setEmail(getId()),
    { json: { email } },
  )
}

function submitSetEmail(
  emailToken: string,
): ApiPromise<Api.User.SetEmailVerified> {
  return AuthService.authenticateAfterRequest(() =>
    ApiService.put<Api.User.SetEmailVerified>(Endpoint.user.setEmail(getId()), {
      json: { token: emailToken },
    }),
  )
}

function setPasswordTraditional(
  currentPassword: string,
  newPassword: string,
): ApiPromise<Api.User.SetPassword> {
  return ApiService.put<Api.User.SetPassword>(
    Endpoint.user.setPassword(getId()),
    { json: { currentPassword, newPassword } },
  )
}

function setPasswordSocial(
  provider: 'vk' | 'google',
  code: string,
  redirectUri: string,
  newPassword: string,
): ApiPromise<Api.User.SetPassword> {
  return ApiService.put<Api.User.SetPassword>(
    Endpoint.user.setPassword(getId()),
    { json: { provider, code, redirectUri, newPassword } },
  )
}

function getPasswordUpdateOptions(): ApiPromise<Api.User.GetPasswordUpdateOptions> {
  return ApiService.get<Api.User.GetPasswordUpdateOptions>(
    Endpoint.user.getPasswordUpdateOptions(getId()),
  )
}

// User management
function setApps(apps: string[]): ApiPromise<Api.User.SetApps> {
  return ApiService.put<Api.User.SetApps>(Endpoint.user.setApps(getId()), {
    json: { apps },
  }).then((response) => {
    StoreController.dispatch(loadAppsSuccess(response.data.categories))
    return response
  })
}

function requestChangeEmail(
  email: string,
): ApiPromise<Api.User.SetEmailRequest> {
  return ApiService.put<Api.User.SetEmailRequest>(
    Endpoint.user.setEmail(getId()),
    { json: { email } },
  )
}

function submitChangeEmail(
  emailToken: string,
): ApiPromise<Api.User.SetEmailVerified> {
  return AuthService.authenticateAfterRequest(() =>
    ApiService.put<Api.User.SetEmailVerified>(Endpoint.user.setEmail(getId()), {
      json: { token: emailToken },
    }),
  )
}

const UserService = {
  setUsername,
  requestSetEmail,
  submitSetEmail,
  setPasswordTraditional,
  setPasswordSocial,
  getPasswordUpdateOptions,
  setApps,
  requestChangeEmail,
  submitChangeEmail,
}
export default UserService
