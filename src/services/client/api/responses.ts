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

  export namespace Auth {
    export type TokenResponse = {
      id: string
      email: string
      token: string
      username: string
      providers: []
    }
  }
}
export default ApiResponse
