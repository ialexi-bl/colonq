import { ApiErrorName, EmailAction, SocialAction } from 'services/api/config'
import { AppState, MixedDispatch, ThunkAction } from 'store/types'
import { HttpError } from 'services/errors'
import { UserApi } from 'services/api'
import { appsList, editPassword, login, profile, register } from 'config/routes'
import { capitalize } from 'util/capitalize'
import { executeAuthorizedMethod } from 'store/user'
import { getTokenField } from 'util/jwt'
import { notifyError, notifyErrorObject, notifyInfo } from 'store/view'
import { push, replace } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

export type AuthAction =
  | null
  | {
      type: 'prompt-reset-password'
      submit: (password: string) => Promise<boolean>
    }
  | {
      type: 'prompt-new-password'
      submit: (password: string) => Promise<boolean>
    }
  | {
      type: 'prompt-vk-email'
      submit: (password: string) => Promise<boolean>
    }

export default function useAuthActionHandler(): AuthAction {
  const location = useLocation()
  const dispatch = useDispatch<MixedDispatch>()
  const userStatus = useSelector((state: AppState) => state.user.status)
  const processed = useRef(false)
  const [action, setAction] = useState<AuthAction>(null)

  useEffect(() => {
    if (processed.current || userStatus === 'loading') return

    processed.current = true
    const query = new URLSearchParams(location.search)

    const authed = userStatus === 'authenticated'
    if (query.has('action')) {
      dispatch(processVerificationFromEmail(query, authed)).then(
        (a) => a && setAction(a),
      )
    } else {
      dispatch(processCallbackAction(query, authed)).then(
        (a) => a && setAction(a),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStatus])

  return action
}

/**
 * Processes actions that are triggered when user presses
 * social button on colonq, goes through oauth screen
 * and is redirected back to colonq
 * @param query - URL query
 */
function processCallbackAction(
  query: URLSearchParams,
  authenticated: boolean,
): ThunkAction<Promise<AuthAction>> {
  return async (dispatch) => {
    const code = query.get('code')
    const data = formatState(query.get('state'))

    if (!data || !code) {
      console.warn(
        `Invalid state or no code in search params: "${Array.from(
          query.entries(),
        )}"`,
      )
      dispatch(replace(authenticated ? appsList() : login()))
      return null
    }

    const { action, provider, redirectUri } = data

    if (action === SocialAction.SOCIAL_LINK && !authenticated) {
      dispatch(
        notifyError('Чтобы связать аккаунт с социальной сетью, нужно войти'),
      )
      dispatch(replace(login()))
      return null
    }
    if (
      authenticated &&
      ![SocialAction.SOCIAL_LINK, SocialAction.SOCIAL_EDIT_PASSWORD].includes(
        action,
      )
    ) {
      dispatch(notifyError('Вход уже выполнен'))
      dispatch(replace(profile()))
      return null
    }

    try {
      switch (action) {
        case SocialAction.SOCIAL_EDIT_PASSWORD: {
          return {
            type: 'prompt-new-password',
            submit: (password: string) => {
              return dispatch(
                submitNewPassword(provider, code, redirectUri, password),
              )
            },
          }
        }
        case SocialAction.SOCIAL_LINK: {
          const method = ({
            vk: 'linkVk',
            google: 'linkGoogle',
          } as const)[provider]

          await dispatch(
            executeAuthorizedMethod(UserApi[method](code, redirectUri)),
          )

          dispatch(replace(profile()))
          dispatch(
            notifyInfo(
              `Аккаунт привязан, теперьты можешь заходить с помощью ${capitalize(
                provider,
              )}`,
            ),
          )
          break
        }
        case SocialAction.SOCIAL_REGISTER:
        case SocialAction.SOCIAL_LOGIN: {
          const method = ({
            [SocialAction.SOCIAL_REGISTER]: {
              vk: 'registerVk',
              google: 'registerGoogle',
            },
            [SocialAction.SOCIAL_LOGIN]: {
              vk: 'loginVk',
              google: 'loginGoogle',
            },
          } as const)[action][provider]

          try {
            await dispatch(UserApi[method](code, redirectUri))
          } catch (e) {
            // Showing email prompt if error is caused by vk not providing email
            if (!(e instanceof HttpError)) {
              throw e
            }
            if ((await e.getApiName()) !== ApiErrorName.MISSING_DATA) {
              throw e
            }

            const detail = await e.getDetail()
            return {
              type: 'prompt-vk-email',
              submit: (email: string) => {
                return dispatch(submitVkEmail(detail?.token || '', email))
              },
            }
          }

          // Message doesn't need to be displayed here
          dispatch(replace(appsList()))
          break
        }
        default: {
          dispatch(replace(authenticated ? appsList() : login()))
        }
      }
    } catch (e) {
      dispatch(notifyErrorObject(e))
      dispatch(
        replace(
          authenticated
            ? appsList()
            : action === SocialAction.SOCIAL_REGISTER
            ? register()
            : login(),
        ),
      )
    }

    return null
  }
}

/**
 * Processes actions that are triggered when user follows
 * a link in an email
 * @param query - URL query
 * @param authenticated - Whether user is currently authenticated
 */
function processVerificationFromEmail(
  query: URLSearchParams,
  authenticated: boolean,
): ThunkAction<Promise<AuthAction>> {
  return async (dispatch) => {
    // Pretend token can be empty so that server throws an error
    // and I don't have to make up custom handling for cases
    // where token is absent
    const token = query.get('token') || ''
    const action = query.get('action')!

    try {
      switch (action) {
        case EmailAction.VERIFY_EMAIL: {
          await dispatch(UserApi.verifyEmail(token))

          dispatch(notifyInfo('Адрес подтверждён, теперь ты можешь войти'))
          dispatch(
            replace(login(), {
              email: getTokenField(token, 'email'),
            }),
          )
          break
        }
        case EmailAction.UPDATE_EMAIL: {
          if (!authenticated) {
            dispatch(
              notifyError('Чтобы обновить электронный адрес, нужно войти'),
            )
            dispatch(replace(login()))
            break
          }

          await dispatch(
            executeAuthorizedMethod(UserApi.submitChangeEmail(token)),
          )
          dispatch(replace(profile()))
          break
        }
        case EmailAction.RESET_PASSWORD: {
          const { data } = await UserApi.validateResetPasswordToken(token)
          if (!data.valid) {
            dispatch(notifyError(data.message))
            dispatch(replace(login()))
          }

          return {
            type: 'prompt-reset-password',
            submit: (password) => {
              return dispatch(submitResetPassword(token, password))
            },
          }
        }
        default: {
          dispatch(replace(authenticated ? appsList() : login()))
        }
      }
    } catch (e) {
      dispatch(notifyErrorObject(e))
      dispatch(replace(authenticated ? appsList() : login()))
    }
    return null
  }
}

/**
 * Submits new password in the restoration procedure
 * @param token - Token from the email
 * @param password - New password
 */
function submitResetPassword(
  token: string,
  password: string,
): ThunkAction<Promise<boolean>> {
  return async (dispatch) => {
    try {
      await UserApi.submitResetPassword(token, password)
      dispatch(notifyInfo('Пароль изменён'))
      dispatch(push(login()))
      return true
    } catch (e) {
      dispatch(notifyErrorObject(e))
      return false
    }
  }
}

/**
 * Submits new password in password edit procedure
 * @param provider - Provider name
 * @param code - OAuth code
 * @param redirectUri - OAuth redirect uri
 * @param password - New password
 */
function submitNewPassword(
  provider: 'vk' | 'google',
  code: string,
  redirectUri: string,
  password: string,
): ThunkAction<Promise<boolean>> {
  return async (dispatch) => {
    try {
      await dispatch(
        executeAuthorizedMethod(
          UserApi.setPasswordSocial(provider, code, redirectUri, password),
        ),
      )
      dispatch(notifyInfo('Пароль изменён'))
      dispatch(push(profile()))
      return true
    } catch (e) {
      if (
        e instanceof HttpError &&
        (await e.getApiName()) === ApiErrorName.BAD_TOKEN
      ) {
        dispatch(
          notifyError(
            'Недействительный токен. Возможно, время его действия истекло. Попробуй ещё раз и не задерживайся с вводом нового пароля',
          ),
        )
        dispatch(push(editPassword()))
        return false
      }
      dispatch(notifyErrorObject(e))
      return false
    }
  }
}

/**
 * Sends user's email when VK didn't provide one
 * @param code - OAuth code
 * @param redirectUri - OAuth redirect uri
 * @param email - User email
 */
function submitVkEmail(
  token: string,
  email: string,
): ThunkAction<Promise<boolean>> {
  return async (dispatch) => {
    try {
      await UserApi.registerVkEmail(token, email)
      return true
    } catch (e) {
      dispatch(notifyErrorObject(e))
      return false
    }
  }
}

type OAuthState = {
  provider: 'vk' | 'google'
  action: SocialAction
  redirectUri: string
}
/**
 * Parses "state" parameter that is passed to oauth provider
 * and is passed back to colonq in url parameters
 * This contains action type, provider name and redirect uri
 * @param state
 */
function formatState(state: string | null): OAuthState | null {
  try {
    const data = JSON.parse(state || '') as unknown
    if (isOAuthState(data)) return data
  } catch (e) {}
  return null
}
/**
 * Validates "state" parameter format
 * @param data
 */
function isOAuthState(data: any): data is OAuthState {
  return (
    data &&
    typeof data === 'object' &&
    Object.values(SocialAction).includes(data.action) &&
    ['vk', 'google'].includes(data.provider) &&
    typeof data.redirectUri === 'string'
  )
}
