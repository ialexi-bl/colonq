import { Api, ApiErrorName, ApiResponse, Endpoint } from 'core/api/config'
import { HttpError } from 'core/errors'
import { authenticateSuccess } from 'store/user'
import ApiService from './api'
import Config from 'config'
import StoreController from 'store/StoreController'

const emailCache: Record<string, boolean> = {}

function authenticateAfterRequest<T extends Api.Auth.UserData>(
  fetch: () => Promise<Api.Success<T>>,
): Promise<Api.Success<T>> {
  return fetch().then((response) => {
    StoreController.dispatch(authenticateSuccess(response.data))
    return response
  })
}

// Authentication
function getSelf(): ApiResponse<Api.Auth.Token> {
  return ApiService.get<Api.Auth.Token>(Endpoint.auth.self, {
    credentials: Config.CORS_MODE,
  })
}

/**
 * Returns boolean if email has already been checked without
 * performing a new request, null if email hasn't been checked
 * @param email
 */
function isEmailOccupiedCache(email: string): boolean | null {
  return email in emailCache ? emailCache[email] : null
}

/**
 * Makes a call to API to check if email, is occupied
 * @param email
 */
async function isEmailOccupied(email: string): Promise<boolean | null> {
  if (email in emailCache) return emailCache[email]

  try {
    await ApiService.get(Endpoint.user.getByEmail(email))
    return (emailCache[email] = true)
  } catch (e) {
    if (e instanceof HttpError) {
      const name = await e.getApiName()

      if (name === ApiErrorName.NOT_FOUND) {
        return (emailCache[email] = false)
      }
      if (name === ApiErrorName.FORBIDDEN) {
        return (emailCache[email] = true)
      }
    }
    return null
  }
}

function resendEmail(id: string): ApiResponse<null> {
  return ApiService.post<null>(Endpoint.auth.resendEmail, {
    json: { id },
  })
}

function register(
  email: string,
  username: string,
  password: string,
): ApiResponse<Api.Auth.Registration> {
  return ApiService.post<Api.Auth.Registration>(Endpoint.auth.register, {
    json: { email, username, password },
  })
}

/**
 * Register user with VK
 * * This method must be dispatched
 * @param code
 * @param redirectUri
 */
function registerVk(
  code: string,
  redirectUri: string,
): ApiResponse<Api.Auth.RegistrationVk> {
  return authenticateAfterRequest(() =>
    ApiService.post<Api.Auth.RegistrationVk>(Endpoint.auth.registerVk, {
      json: { code, redirectUri },
    }),
  )
}

/**
 * Verifies email for user whose VK didn't provide one
 * * This method must be dispatched
 * @param token
 * @param email
 */
function registerVkEmail(
  token: string,
  email: string,
): ApiResponse<Api.Auth.RegistrationVk> {
  return ApiService.post<Api.Auth.RegistrationVk>(
    Endpoint.auth.registerVkWithEmail,
    { json: { token, email } },
  )
}

/**
 * Register user with Google
 * * This method must be dispatched
 * @param code
 * @param redirectUri
 */
function registerGoogle(
  code: string,
  redirectUri: string,
): ApiResponse<Api.Auth.RegistrationGoogle> {
  return authenticateAfterRequest(() =>
    ApiService.post<Api.Auth.RegistrationGoogle>(Endpoint.auth.registerGoogle, {
      json: { code, redirectUri },
    }),
  )
}

/**
 * Logs user in
 * * This method must be dispatched
 * @param code
 * @param redirectUri
 */
function login(login: string, password: string): ApiResponse<Api.Auth.Login> {
  return authenticateAfterRequest(() =>
    ApiService.post<Api.Auth.Login>(Endpoint.auth.login, {
      json: { login, password },
    }),
  )
}

/**
 * Logs user in with VK
 * * This method must be dispatched
 * @param code
 * @param redirectUri
 */
function loginVk(
  code: string,
  redirectUri: string,
): ApiResponse<Api.Auth.LoginVk> {
  return authenticateAfterRequest(() =>
    ApiService.post<Api.Auth.LoginVk>(Endpoint.auth.loginVk, {
      json: { code, redirectUri },
    }),
  )
}

/**
 * Logs user in with Google
 * * This method must be dispatched
 * @param code
 * @param redirectUri
 */
function loginGoogle(
  code: string,
  redirectUri: string,
): ApiResponse<Api.Auth.LoginGoogle> {
  return authenticateAfterRequest(() =>
    ApiService.post<Api.Auth.LoginGoogle>(Endpoint.auth.loginGoogle, {
      json: { code, redirectUri },
    }),
  )
}

function linkVk(
  code: string,
  redirectUri: string,
): ApiResponse<Api.Auth.LinkVk> {
  return authenticateAfterRequest(() =>
    ApiService.post<Api.Auth.LinkVk>(Endpoint.auth.linkVk, {
      json: { code, redirectUri },
    }),
  )
}

function linkGoogle(
  code: string,
  redirectUri: string,
): ApiResponse<Api.Auth.LinkGoogle> {
  return authenticateAfterRequest(() =>
    ApiService.post<Api.Auth.LinkGoogle>(Endpoint.auth.linkGoogle, {
      json: { code, redirectUri },
    }),
  )
}

function requestResetPassword(
  login: string,
): ApiResponse<Api.Auth.ResetPassword> {
  return ApiService.post<Api.Auth.ResetPassword>(Endpoint.auth.resetPassword, {
    json: { login },
  })
}

function submitResetPassword(
  token: string,
  password: string,
): ApiResponse<Api.Auth.ResetPassword> {
  return ApiService.post<Api.Auth.ResetPassword>(
    Endpoint.auth.resetPasswordSubmit,
    { json: { token, password } },
  )
}

function validateResetPasswordToken(
  token: string,
): ApiResponse<Api.Auth.ResetPasswordValidate> {
  return ApiService.post<Api.Auth.ResetPasswordValidate>(
    Endpoint.auth.resetPasswordValidate,
    { json: { token } },
  )
}

function verifyEmail(token: string): ApiResponse<Api.Auth.VerifyEmail> {
  return authenticateAfterRequest(() =>
    ApiService.post<Api.Auth.VerifyEmail>(Endpoint.auth.verifyEmail, {
      json: { token },
    }),
  )
}

function logout(): ApiResponse<Api.Auth.Logout> {
  document.cookie = `${Config.CHECK_COOKIE}=; max-age=0`

  // Even if this request fails, because check cookie is deleted
  // user will be logged out
  return ApiService.post<Api.Auth.Logout>(Endpoint.auth.logout).catch(
    (): Api.Success<Api.Auth.Logout> => ({
      success: true,
      data: null,
    }),
  )
}

const AuthService = {
  authenticateAfterRequest,
  getSelf,
  isEmailOccupiedCache,
  isEmailOccupied,
  resendEmail,
  register,
  registerVk,
  registerVkEmail,
  registerGoogle,
  login,
  loginVk,
  loginGoogle,
  linkVk,
  linkGoogle,
  requestResetPassword,
  submitResetPassword,
  validateResetPasswordToken,
  verifyEmail,
  logout,
}
export default AuthService
