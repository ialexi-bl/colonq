import { ApiErrorName, ApiResponse, Endpoint } from 'services/client/config'
import { HttpError } from 'services/errors'
import { StoreConsumer } from 'store'
import { authenticateSuccess, unauthenticate } from 'store/user'
import { getTokenExpirationTime } from 'util/jwt'
import ApiClient from 'services/client'

import Config from 'config'

export default class UserService extends StoreConsumer {
  private get user() {
    return this.selector((state) => state.user)
  }

  constructor(private readonly client: ApiClient) {
    super()
  }

  /**
   * Checks whether given email is occupied or not
   * Returns null if request failed
   * @param email
   */
  public async isEmailOccupied(email: string) {
    try {
      await this.client.get(Endpoint.user.getByEmail(email))
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

  /**
   * Updates user name
   * @param username
   */
  public async changeUsername(username: string) {
    if (this.user.status !== 'authenticated') {
      // TODO: log to server
      console.warn('Tried to update username while user is not authenticated')
      return
    }

    const { data } = await this.client.put<ApiResponse.User.SetUsername>(
      Endpoint.user.setUsername(this.user.id),
      { json: { username }, authenticate: true },
    )
    this.dispatch(
      authenticateSuccess({
        ...data,
        tokenExpires: getTokenExpirationTime(data.token),
      }),
    )
  }

  /**
   * Sends a request to change user email, after which user must verify
   * it by following a link sent via email to this new address
   * @param email
   */
  public async changeEmailRequest(email: string) {
    if (this.user.status !== 'authenticated') {
      // TODO: log to server
      console.warn('Tried to update username while user is not authenticated')
      return
    }

    await this.client.put<ApiResponse.User.SetEmailRequest>(
      Endpoint.user.setEmail(this.user.id),
      { json: { email }, authenticate: true },
    )
  }

  /**
   * Changes email after user has followed the link sent
   * to the new address
   * @param token
   */
  public async changeEmailSubmit(token: string) {
    if (this.user.status !== 'authenticated') {
      // TODO: log to server
      console.warn('Tried to update username while user is not authenticated')
      return
    }

    const { data } = await this.client.put<ApiResponse.User.SetEmailVerified>(
      Endpoint.user.setEmail(this.user.id),
      { json: { token }, authenticate: true },
    )
    this.dispatch(
      authenticateSuccess({
        ...data,
        tokenExpires: getTokenExpirationTime(data.token),
      }),
    )
  }

  /**
   * Registers user with email and password
   * @param email
   * @param username
   * @param password
   */
  public async register(email: string, username: string, password: string) {
    const { data } = await this.client.post<ApiResponse.Auth.Registration>(
      Endpoint.auth.register,
      { json: { email, username, password } },
    )
    return data
  }

  /**
   * Registers user with google social login
   * @param code
   * @param redirectUri
   */
  public async registerGoogle(code: string, redirectUri: string) {
    const { data } = await this.client.post<
      ApiResponse.Auth.RegistrationGoogle
    >(Endpoint.auth.registerGoogle, { json: { code, redirectUri } })
    this.dispatch(
      authenticateSuccess({
        ...data,
        tokenExpires: getTokenExpirationTime(data.token),
      }),
    )
  }

  /**
   * Registers user with vk social login
   * @param code
   * @param redirectUri
   */
  public async registerVk(code: string, redirectUri: string) {
    const { data } = await this.client.post<ApiResponse.Auth.RegistrationVk>(
      Endpoint.auth.registerVk,
      { json: { code, redirectUri } },
    )
    this.dispatch(
      authenticateSuccess({
        ...data,
        tokenExpires: getTokenExpirationTime(data.token),
      }),
    )
  }

  public async registerVkEmail(token: string, email: string) {
    const { data } = await this.client.post<ApiResponse.Auth.RegistrationVk>(
      Endpoint.auth.registerVkWithEmail,
      { json: { token, email } },
    )
    return data
  }

  /**
   * Logs user in with login and password
   * Returns nothing
   * @param login
   * @param password
   */
  public login(login: string, password: string) {
    return this._login<ApiResponse.Auth.Login>(Endpoint.auth.login, {
      login,
      password,
    })
  }

  /**
   * Logs user in via google social login
   * @param code
   * @param redirectUri
   */
  public loginGoogle(code: string, redirectUri: string) {
    return this._login<ApiResponse.Auth.LoginGoogle>(
      Endpoint.auth.loginGoogle,
      { code, redirectUri },
    )
  }

  /**
   * Logs user in via google vk login
   * @param code
   * @param redirectUri
   */
  public loginVk(code: string, redirectUri: string) {
    return this._login<ApiResponse.Auth.LoginGoogle>(Endpoint.auth.loginVk, {
      code,
      redirectUri,
    })
  }

  /**
   * Links user's google account to colonq account
   * @param code
   * @param redirectUri
   */
  public linkGoogle(code: string, redirectUri: string) {
    return this._login<ApiResponse.Auth.LinkGoogle>(Endpoint.auth.linkGoogle, {
      code,
      redirectUri,
    })
  }

  /**
   * Links user's vk account to colonq account
   * @param code
   * @param redirectUri
   */
  public linkVk(code: string, redirectUri: string) {
    return this._login<ApiResponse.Auth.LinkVk>(Endpoint.auth.linkVk, {
      code,
      redirectUri,
    })
  }

  /**
   * Notifies server that user's email has been verified
   * @param token
   */
  public async verifyEmail(token: string) {
    const { data } = await this.client.post<ApiResponse.Auth.VerifyEmail>(
      Endpoint.auth.verifyEmail,
      { json: { token } },
    )
    return data
  }

  /**
   * Sends a prompt to restore password, after which
   * user has to verify that they own the account
   * by following a link sent via email
   * @param login
   */
  public async restorePasswordRequest(login: string) {
    const { data } = await this.client.post<ApiResponse.Auth.RestorePassword>(
      Endpoint.auth.restorePassword,
      { json: { login } },
    )
    return data
  }

  /**
   * Notifies server user has verified identity and password may
   * now be changed
   * @param token
   * @param password
   */
  public async restorePasswordSubmit(token: string, password: string) {
    const { data } = await this.client.post<ApiResponse.Auth.RestorePassword>(
      Endpoint.auth.restorePassword,
      { json: { token, password } },
    )
    return data
  }

  /**
   * Logs user out
   */
  public logout() {
    this.dispatch(unauthenticate())
    document.cookie = `${Config.CHECK_COOKIE}=; max-age=0`

    // Even if this request fails, because check cookie is deleted
    // user won't be able to log in
    this.client.post<ApiResponse.Auth.Logout>(Endpoint.auth.logout).catch()
  }

  /**
   * Common logic for login methods
   * @param url
   * @param body
   */
  private async _login<T extends ApiResponse.Auth.UserData>(
    url: string,
    body: any,
  ): Promise<void> {
    const { data } = await this.client.post<T>(url, { json: body })

    this.dispatch(
      authenticateSuccess({
        ...data,
        tokenExpires: getTokenExpirationTime(data.token),
      }),
    )
  }
}
