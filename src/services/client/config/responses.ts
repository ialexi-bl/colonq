import ApiErrorName from './error-names'

declare namespace ApiResponse {
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

    export type CategoryDescription = {
      id: string
      title: string
      apps: AppDescription[]
    }
    export type AppDescription = {
      id: string
      title: string
      score: number
      icon: string
    }

    export type DetailedAppDescription = {
      title: string
      icon: string
      lessons: LessonDescription[]
    }
    export type LessonDescription = {
      id: string
      icon: string
      score: number
      title: string
      unlocked: boolean
    }

    export type GetApp = DetailedAppDescription
    export type GetApps = { categories: CategoryDescription[] }

    export type PasswordUpdateOption = 'password' | 'vk' | 'google'
    export type GetPasswordUpdateOptions = PasswordUpdateOption[]

    export type SetPassword = null
    export type SetUsername = Auth.Login
    export type SetEmailRequest = null
    export type SetEmailVerified = Auth.Login
    export type SetApps = GetApps
  }

  export namespace Apps {
    export type Category = {
      id: string
      title: string
      apps: App[]
    }
    export type App = {
      id: string
      icon: string
      title: string
      description: string
    }

    export type GetApps = { categories: Category[] }
  }

  export namespace Auth {
    export type UserData = {
      id: string
      email: string
      token: string
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
    export type LinkVk = UserData
    export type LinkGoogle = UserData

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

  export namespace Session {
    type SessionData<TProblem> = {
      app: string
      problems: TProblem[]
    }

    type Submit = {
      updatedLessons: { old: number; new: number; id: string }[]
      unlockedLessons: string[]
      lessons: User.LessonDescription[]
    }
  }
}
export default ApiResponse
