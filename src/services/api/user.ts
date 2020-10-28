import { ApiErrorName, ApiResponse, Endpoint } from 'services/client/config'
import { HttpError } from 'services/errors'
import Api from './api'
import Config from 'config'

export default class AuthApi {
  public static fetchToken() {
    return () =>
      Api.post<ApiResponse.Auth.Token>(Endpoint.auth.token, {
        credentials: Config.CORS_MODE,
      })
  }

  public static isEmailOccupied(email: string) {
    return async () => {
      try {
        await Api.get(Endpoint.user.getByEmail(email))
        return true
      } catch (e) {
        if (e instanceof HttpError) {
          const name = await e.getApiName()

          if (name === ApiErrorName.NOT_FOUND) {
            return false
          }
          if (name === ApiErrorName.FORBIDDEN) {
            return true
          }
        }
      }

      return null
    }
  }

  public static register(email: string, username: string, password: string) {
    return () =>
      Api.post<ApiResponse.Auth.Registration>(Endpoint.auth.register, {
        json: { email, username, password },
      })
  }

  public static registerVk(code: string, redirectUri: string) {
    return () =>
      Api.post<ApiResponse.Auth.RegistrationVk>(Endpoint.auth.registerVk, {
        credentials: Config.CORS_MODE,
        json: { code, redirectUri },
      })
  }

  public static registerVkEmail(token: string, email: string) {
    return () =>
      Api.post<ApiResponse.Auth.RegistrationVk>(
        Endpoint.auth.registerVkWithEmail,
        { credentials: Config.CORS_MODE, json: { token, email } },
      )
  }

  public static registerGoogle(code: string, redirectUri: string) {
    return () =>
      Api.post<ApiResponse.Auth.RegistrationGoogle>(
        Endpoint.auth.registerGoogle,
        { credentials: Config.CORS_MODE, json: { code, redirectUri } },
      )
  }

  public static login(login: string, password: string) {
    return () =>
      Api.post<ApiResponse.Auth.Login>(Endpoint.auth.login, {
        credentials: Config.CORS_MODE,
        json: { login, password },
      })
  }

  public static loginVk(code: string, redirectUri: string) {
    return () =>
      Api.post<ApiResponse.Auth.LoginVk>(Endpoint.auth.loginVk, {
        credentials: Config.CORS_MODE,
        json: { code, redirectUri },
      })
  }

  public static loginGoogle(code: string, redirectUri: string) {
    return () =>
      Api.post<ApiResponse.Auth.LoginGoogle>(Endpoint.auth.loginGoogle, {
        credentials: Config.CORS_MODE,
        json: { code, redirectUri },
      })
  }

  public static requestRestorePassword(login: string) {
    return () =>
      Api.post<ApiResponse.Auth.RestorePassword>(
        Endpoint.auth.restorePassword,
        { json: { login } },
      )
  }

  // TODO: verify token before asking password
  public static submitRestorePassword(token: string, password: string) {
    return () =>
      Api.post<ApiResponse.Auth.RestorePassword>(
        Endpoint.auth.restorePassword,
        { json: { token, password } },
      )
  }

  public static verifyEmail(token: string) {
    return () =>
      Api.post<ApiResponse.Auth.VerifyEmail>(Endpoint.auth.verifyEmail, {
        json: { token },
      })
  }

  public static logout() {
    document.cookie = `${Config.CHECK_COOKIE}=; max-age=0`

    // Even if this request fails, because check cookie is deleted
    // user won't be able to log in
    return () =>
      Api.post<ApiResponse.Auth.Logout>(Endpoint.auth.logout).then(
        () => null,
        () => null,
      )
  }
}
