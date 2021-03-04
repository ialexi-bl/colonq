/* eslint-disable @typescript-eslint/no-namespace */
import ApiErrorName from './error-names'

export type ApiResponse<T> = Api.Success<T>
export type ApiPromise<T> = Promise<ApiResponse<T>>

declare namespace Api {
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

  export type Subscription = {
    hour: number
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
      apps: AppDescription[]
      title: string
    }
    export type AppDescription = {
      id: string
      icon: string
      title: string
      score: number
      iconsSet: string
      hasSettings: boolean
    }

    // export type DetailedAppDescription = {
    //   icon: string
    //   title: string
    //   lessons: LessonDescription[]
    //   iconsSet: string
    //   hasSettings: boolean
    // }
    // export type LessonDescription = {
    //   id: string
    //   icon: string
    //   score: number
    //   title: string
    //   unlocked: boolean
    // }

    // export type GetApp = DetailedAppDescription
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
    export type ResetPasswordValidate =
      | {
          valid: true
        }
      | {
          valid: false
          message: string
        }
    export type RegistrationVk = Registration & UserData
    export type RegistrationGoogle = Registration & UserData
    export type Login = UserData
    export type LoginVk = UserData
    export type LoginGoogle = UserData
    export type LinkVk = UserData
    export type LinkGoogle = UserData
    export type VerifyEmail = UserData

    type LinkCommon = { id: string }
    export type VkLink = LinkCommon
    export type GoogleLink = LinkCommon

    export type Logout = null
    export type ResetPassword = null
  }

  export namespace Session {
    type SessionData<TProblem> = {
      app: string
      problems: TProblem[]
    }

    type Submit = {
      updatedStages: { old: number; new: number; icon: string; id: string }[]
      unlockedStages: { icon: string; id: string }[]
      // lessons: User.LessonDescription[]
    }
  }

  export namespace Settings {
    export type Get = Setting[]
    export type Change = null

    export type Setting = Toggle | StagesControls
    export type Toggle = {
      id: string
      type: 'toggle'
      label: string
      value: boolean
    }

    export type StagesControls = {
      id: string
      type: 'stages'
      title: string
      items: Stage[]
      description?: string
    }
    export type Stage = {
      id: string
      icon: string
      label: string
      unlocked: boolean
      sets: StageSet[]
    }
    export type StageSet = {
      id: string
      icon: string
      label: string
      problems: StageProblem[]
    }
    export type StageProblem = {
      id: string
      label: string
      enabled: boolean
    }

    export type ToggleList = {
      id: string
      type: 'list'
      title: string
      items: TogglelistGroup[]
      virtualize?: boolean
      description?: string
    }
    export type TogglelistGroup = {
      id: string
      type: 'group'
      label: string
      value: boolean
      disabled?: boolean
      items: ToggleListItem[]
    }
    export type ToggleListItem = {
      id: string
      type: 'item'
      label: string
      value: boolean
    }
  }
}
export default Api
