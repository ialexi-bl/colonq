import ApiErrorName from './error-names'

namespace ApiResponse {
  export type Success<T = null> = {
    success: true
    data: T
  }
  export type Error<T = never> = {
    success: false
    error: {
      name: ApiErrorName
      message: string
      detail: T
    }
  }

  export namespace User {
    export type AllowedFields = 'id' | 'apps' | 'username'
    export type Get<T extends AllowedFields = AllowedFields> = Pick<
      {
        id: string
        apps: string[]
        username: string
      },
      T
    >
    export type GetApps = { apps: string }

    export type PasswordUpdateOption = 'password' | 'vk' | 'google'
    export type GetPasswordUpdateOptions = PasswordUpdateOption[]

    export type SetPassword = null
    export type SetUsername = Auth.Login
    export type SetEmailRequest = null
    export type SetEmailVerified = Auth.Login
  }

  export namespace Auth {
    export type UserData = {
      token: string
      id: string
      email: string
      username: string
      providers: string[]
    }

    export type Token = UserData

    export type Registration = {
      id: string
      email: string
      username: string
      providers: string[]
      emailVerified: boolean
    }
    export type RegistrationVk = Registration & UserData
    export type RegistrationGoogle = Registration & UserData
    export type Login = UserData
    export type LoginVk = UserData
    export type LoginGoogle = UserData

    type LinkCommon = { id: string }
    export type VkLink = LinkCommon
    export type GoogleLink = LinkCommon

    export type VerifyEmail = {
      id: string
      emailVerified: boolean
    }

    export type Logout = null
    export type RestorePassword = null
  }
}
export default ApiResponse
