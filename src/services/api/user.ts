import { ApiErrorName, ApiResponse, Endpoint } from 'services/api/config'
import { HttpError } from 'services/errors'
import { MixedDispatch } from 'store/types'
import { loadAppsSuccess } from 'store/user'
import Api from './api'
import Config from 'config'

const emailCache: Record<string, boolean> = {}

export default class UserApi {
  // Authentication
  public static fetchToken() {
    return Api.post<ApiResponse.Auth.Token>(Endpoint.auth.token, {
      credentials: Config.CORS_MODE,
    })
  }

  /**
   * Returns boolean if email has already been checked without
   * performing a new request, null if email hasn't been checked
   * @param email
   */
  public static isEmailOccupiedCache(email: string) {
    return email in emailCache ? emailCache[email] : null
  }

  /**
   * Makes a call to API to check if email, is occupied
   * @param email
   */
  public static async isEmailOccupied(email: string) {
    if (email in emailCache) return emailCache[email]

    try {
      await Api.get(Endpoint.user.getByEmail(email))
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

  public static register(email: string, username: string, password: string) {
    return Api.post<ApiResponse.Auth.Registration>(Endpoint.auth.register, {
      json: { email, username, password },
    })
  }

  /**
   * Register user with VK
   * * This method must be dispatched
   * @param code
   * @param redirectUri
   */
  public static registerVk(code: string, redirectUri: string) {
    return Api.authenticate(() =>
      Api.post<ApiResponse.Auth.RegistrationVk>(Endpoint.auth.registerVk, {
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
  public static registerVkEmail(token: string, email: string) {
    return Api.authenticate(() =>
      Api.post<ApiResponse.Auth.RegistrationVk>(
        Endpoint.auth.registerVkWithEmail,
        { json: { token, email } },
      ),
    )
  }

  /**
   * Register user with Google
   * * This method must be dispatched
   * @param code
   * @param redirectUri
   */
  public static registerGoogle(code: string, redirectUri: string) {
    return Api.authenticate(() =>
      Api.post<ApiResponse.Auth.RegistrationGoogle>(
        Endpoint.auth.registerGoogle,
        { json: { code, redirectUri } },
      ),
    )
  }

  /**
   * Logs user in
   * * This method must be dispatched
   * @param code
   * @param redirectUri
   */
  public static login(login: string, password: string) {
    return Api.authenticate(() =>
      Api.post<ApiResponse.Auth.Login>(Endpoint.auth.login, {
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
  public static loginVk(code: string, redirectUri: string) {
    return Api.authenticate(() =>
      Api.post<ApiResponse.Auth.LoginVk>(Endpoint.auth.loginVk, {
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
  public static loginGoogle(code: string, redirectUri: string) {
    return Api.authenticate(() =>
      Api.post<ApiResponse.Auth.LoginGoogle>(Endpoint.auth.loginGoogle, {
        json: { code, redirectUri },
      }),
    )
  }

  public static linkVk(code: string, redirectUri: string) {
    return Api.authorizedAuthenticate((token) =>
      Api.post<ApiResponse.Auth.LinkVk>(Endpoint.auth.linkVk, {
        json: { code, redirectUri },
        token,
      }),
    )
  }

  public static linkGoogle(code: string, redirectUri: string) {
    return Api.authorizedAuthenticate((token) =>
      Api.post<ApiResponse.Auth.LinkGoogle>(Endpoint.auth.linkGoogle, {
        json: { code, redirectUri },
        token,
      }),
    )
  }

  public static requestRestorePassword(login: string) {
    return Api.post<ApiResponse.Auth.RestorePassword>(
      Endpoint.auth.restorePassword,
      { json: { login } },
    )
  }

  // TODO: verify token before asking password
  public static submitRestorePassword(token: string, password: string) {
    return Api.post<ApiResponse.Auth.RestorePassword>(
      Endpoint.auth.restorePassword,
      { json: { token, password } },
    )
  }

  public static verifyEmail(token: string) {
    return Api.post<ApiResponse.Auth.VerifyEmail>(Endpoint.auth.verifyEmail, {
      json: { token },
    })
  }

  public static logout() {
    document.cookie = `${Config.CHECK_COOKIE}=; max-age=0`

    // Even if this request fails, because check cookie is deleted
    // user won't be able to log in
    return Api.post<ApiResponse.Auth.Logout>(Endpoint.auth.logout).catch(
      (): ApiResponse.Success<ApiResponse.Auth.Logout> => ({
        success: true,
        data: null,
      }),
    )
  }

  public static setUsername(username: string) {
    return Api.authorizedAuthenticate((token: string, id: string) =>
      Api.put<ApiResponse.User.SetUsername>(Endpoint.user.setUsername(id), {
        json: { username },
        token,
      }),
    )
  }

  public static requestSetEmail(email: string) {
    return (token: string, id: string) =>
      Api.put<ApiResponse.User.SetEmailRequest>(Endpoint.user.setEmail(id), {
        json: { email },
        token,
      })
  }

  public static submitSetEmail(emailToken: string) {
    return Api.authorizedAuthenticate((token: string, id: string) =>
      Api.put<ApiResponse.User.SetEmailVerified>(Endpoint.user.setEmail(id), {
        json: { token: emailToken },
        token,
      }),
    )
  }

  public static setPasswordTraditional(
    currentPassword: string,
    newPassword: string,
  ) {
    return (token: string, id: string) =>
      Api.put<ApiResponse.User.SetPassword>(Endpoint.user.setPassword(id), {
        json: { currentPassword, newPassword },
        token,
      })
  }

  public static setPasswordSocial(
    provider: 'vk' | 'google',
    code: string,
    redirectUri: string,
    newPassword: string,
  ) {
    return (token: string, id: string) =>
      Api.put<ApiResponse.User.SetPassword>(Endpoint.user.setPassword(id), {
        json: { provider, code, redirectUri, newPassword },
        token,
      })
  }

  public static getPasswordUpdateOptions() {
    return (token: string, id: string) =>
      Api.get<ApiResponse.User.PasswordUpdateOption>(
        Endpoint.user.getPasswordUpdateOptions(id),
        { token },
      )
  }

  // User management
  public static setApps(apps: string[]) {
    return (token: string, id: string, dispatch: MixedDispatch) =>
      Api.put<ApiResponse.User.SetApps>(Endpoint.user.setApps(id), {
        json: { apps },
        token,
      }).then((response) => {
        dispatch(loadAppsSuccess(response.data.categories))
        return response
      })
  }

  public static requestChangeEmail(email: string) {
    return (token: string, id: string) =>
      Api.put<ApiResponse.User.SetEmailRequest>(Endpoint.user.setEmail(id), {
        json: { email },
        token,
      })
  }

  public static submitChangeEmail(emailToken: string) {
    return Api.authorizedAuthenticate((token, id) =>
      Api.put<ApiResponse.User.SetEmailVerified>(Endpoint.user.setEmail(id), {
        json: { token: emailToken },
        token,
      }),
    )
  }
}
