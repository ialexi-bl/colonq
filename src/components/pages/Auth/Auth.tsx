import {
  ApiErrorName,
  SocialVerificationAction,
  VerificationAction,
} from 'services/api/config'
import { AppState, MixedDispatch, ThunkAction } from 'store/types'
import { HttpError } from 'services/errors'
import { UserApi } from 'services/api'
import { appsList, login, profile } from 'config/routes'
import {
  closeLoading,
  notifyError,
  notifyErrorObject,
  notifyInfo,
  openLoading,
} from 'store/view'
import { executeAuthorizedMethod } from 'store/user'
import { getTokenField } from 'util/jwt'
import { push, replace } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import EmailPrompt from './EmailPrompt'
import LangErrors from 'lang/errors.json'
import LangNotifications from 'lang/notifications.json'
import NewPasswordPrompt from './NewPasswordPrompt'
import React, { useEffect, useRef, useState } from 'react'

type Status =
  | null
  | { action: 'prompt-password'; loading?: boolean }
  | {
      action: 'prompt-email'
      token: string
      loading?: boolean
      emailSent?: boolean
    }

export default function Auth() {
  const dispatch = useDispatch<MixedDispatch>()
  const location = useLocation()
  const [status, setStatus] = useState<Status>(null)
  const authStatus = useSelector((state: AppState) => state.user.status)
  const params = new URLSearchParams(location.search)
  const processed = useRef(false)

  useEffect(() => {
    if (processed.current || authStatus === 'loading') return
    processed.current = true

    dispatch(openLoading('auth'))
    dispatch(process(authStatus === 'authenticated', params)).then((status) => {
      dispatch(closeLoading('auth'))
      if (status) setStatus(status)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus])

  if (!status) return null
  switch (status.action) {
    case 'prompt-password':
      return (
        <NewPasswordPrompt
          loading={status.loading}
          onSubmit={async (password) => {
            setStatus({ action: 'prompt-password', loading: true })
            await dispatch(submitNewPassword(params, password))
            setStatus({ action: 'prompt-password', loading: false })
          }}
        />
      )
    case 'prompt-email':
      return (
        <EmailPrompt
          loading={status.loading}
          emailSent={status.emailSent}
          onSubmit={async (email) => {
            setStatus({ ...status, loading: true })
            const emailSent = await dispatch(
              submitMissingEmail(status.token, email),
            )
            setStatus({ ...status, loading: true, emailSent })
          }}
        />
      )
    default:
      return null
  }
}

function process(
  authenticated: boolean,
  search: URLSearchParams,
): ThunkAction<Promise<Status>> {
  return search.has('action')
    ? processAction(authenticated, search)
    : processSocialLogin(authenticated, search)
}

function processAction(
  authenticated: boolean,
  search: URLSearchParams,
): ThunkAction<Promise<Status>> {
  return async (dispatch) => {
    // Pretend token is defined, so that server throws an error
    // and I don't have to make up custom handling for cases
    // where token is absent
    const token = search.get('token') || ''

    try {
      switch (search.get('action')!) {
        case VerificationAction.VERIFY_EMAIL: {
          await UserApi.verifyEmail(token)

          dispatch(notifyInfo(LangNotifications.emailVerified))
          if (authenticated) {
            dispatch(replace(appsList()))
          } else {
            dispatch(replace(login(), { email: getTokenField(token, 'email') }))
          }

          return null
        }
        case VerificationAction.UPDATE_EMAIL: {
          if (!authenticated) {
            dispatch(notifyError(LangErrors.unauthenticated))
            break
          }

          await dispatch(
            executeAuthorizedMethod(UserApi.submitChangeEmail(token)),
          )
          dispatch(replace(appsList()))
          return null
        }
        case VerificationAction.RESTORE_PASSWORD: {
          return { action: 'prompt-password' }
        }
        default: {
          dispatch(replace(authenticated ? appsList() : login()))
          return null
        }
      }
    } catch (e) {
      dispatch(notifyErrorObject(e))
      dispatch(replace(authenticated ? appsList() : login()))
    }
    return null
  }
}
function processSocialLogin(
  authenticated: boolean,
  search: URLSearchParams,
): ThunkAction<Promise<Status>> {
  return async (dispatch) => {
    const code = search.get('code')
    const state = search.get('state')
    const data = getDataFromState(state)

    if (!data || !code) {
      console.warn(
        `Invalid state or no code in search params: "${Array.from(
          search.entries(),
        )}"`,
      )
      dispatch(replace(authenticated ? appsList() : login()))
      return null
    }

    const { action, provider, redirectUri } = data

    try {
      if (action === SocialVerificationAction.SOCIAL_PASSWORD) {
        // TODO: implement
      } else if (
        action === SocialVerificationAction.SOCIAL_LINK &&
        !authenticated
      ) {
        // TODO: maybe move to language pack
        dispatch(
          notifyError('Чтобы связать аккаунт с социальной сетью, нужно войти'),
        )
        dispatch(replace(appsList()))
        // TODO: show notification about logging in
      } else if (
        action !== SocialVerificationAction.SOCIAL_LINK &&
        authenticated
      ) {
        // TODO: maybe move to language pack
        dispatch(notifyError('Нельзя войти дважды'))
        dispatch(replace(appsList()))
      } else {
        if (action === SocialVerificationAction.SOCIAL_LINK) {
          const method = ({
            vk: 'linkVk',
            google: 'linkGoogle',
          } as const)[provider]

          await dispatch(
            executeAuthorizedMethod(UserApi[method](code, redirectUri)),
          )
        } else {
          const method = ({
            [SocialVerificationAction.SOCIAL_REGISTER]: {
              vk: 'registerVk',
              google: 'registerGoogle',
            },
            [SocialVerificationAction.SOCIAL_LOGIN]: {
              vk: 'loginVk',
              google: 'loginGoogle',
            },
          } as const)[action][provider]

          // If this method doesn't throw error, user will be authenticated
          await dispatch(UserApi[method](code, redirectUri))
        }
        dispatch(replace(appsList()))

        return null
      }
    } catch (e) {
      if (
        e instanceof HttpError &&
        (await e.getApiName()) === ApiErrorName.MISSING_DATA
      ) {
        return {
          token: (await e.getDetail()).token || '',
          action: 'prompt-email',
        }
      }

      dispatch(notifyErrorObject(e))
      dispatch(replace(authenticated ? appsList() : login()))
    }

    return null
  }
}

function submitNewPassword(
  search: URLSearchParams,
  password: string,
): ThunkAction<Promise<void>> {
  return async (dispatch) => {
    try {
      await UserApi.submitRestorePassword(search.get('token')!, password)

      // TODO: maybe extract to language
      dispatch(notifyInfo('Пароль изменён'))
      dispatch(push(profile()))
    } catch (e) {
      // TODO: maybe change route?
      dispatch(notifyErrorObject(e))
    }
  }
}

function submitMissingEmail(
  token: string,
  email: string,
): ThunkAction<Promise<boolean>> {
  return async (dispatch) => {
    // If extra social networks will be added, add here
    // logic to handle missing email not only for vk but for every one
    try {
      await dispatch(UserApi.registerVkEmail(token, email))
      dispatch(push(appsList()))

      return true
    } catch (e) {
      dispatch(notifyErrorObject(e))
      return false
    }
  }
}

function getDataFromState(
  state: string | null,
): {
  provider: 'vk' | 'google'
  action: SocialVerificationAction
  redirectUri: string
} | null {
  try {
    const data = JSON.parse(state || '')

    if (
      !Object.values(SocialVerificationAction).includes(data.action) ||
      !['vk', 'google'].includes(data.provider) ||
      typeof data.redirectUri !== 'string'
    ) {
      return null
    }

    return data
  } catch (e) {
    return null
  }
}
