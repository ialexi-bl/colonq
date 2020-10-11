import { EmailRequest } from './EmailRequest'
import { Endpoints } from 'config/endpoints'
import { Location } from 'history'
import { MixedDispatch, ThunkAction } from 'store/types'
import { PageContainer } from 'components/shared/Page'
import { SendEmailResponse, VerifyEmailResponse } from 'response-types/auth'
import { StatusCode } from 'services/client/api/error-names'
import { UnknownError } from 'services/errors'
import { emailRegex } from 'config/regex'
import { handleRequestError } from 'services/errors/handle-request-error'
import { closeLoading, notifyError, notifyInfo, openLoading } from 'store/view'
import { profile } from 'config/routes'
import { replace } from 'connected-react-router'
import { unauthenticate } from 'store/user'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import ApiClient from 'services/client'
import LangErrors from 'lang/errors.json'
import LangNotifications from 'lang/notifications.json'
import React, { useCallback, useEffect, useState } from 'react'
import initApp from 'store/view/init-action'
import styles from './Auth.module.scss'

declare const gtag: Gtag.Gtag
declare const ym: ym.Event

const AUTH_LOADING = 'Auth'
export default function Auth() {
  const dispatch = useDispatch<MixedDispatch>()
  const location = useLocation()
  const [token, setToken] = useState('')
  const [status, setStatus] = useState<null | 'no-email' | 'verify'>(null)

  useEffect(
    () => {
      dispatch(check(location)).then((result) => {
        if (result.needEmail) {
          setToken(result.token)
          setStatus('no-email')
        }
      })
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  )

  const verifyEmail = useCallback(
    (email: string) => {
      async function request() {
        dispatch(openLoading(AUTH_LOADING))
        const response = await ApiClient.post<SendEmailResponse>(
          Endpoints.Auth.sendEmail,
          { json: { email, token } },
        )

        if (response.status === 'ok') {
          setStatus('verify')
          dispatch(closeLoading(AUTH_LOADING))
        } else {
          throw new UnknownError()
        }
      }

      if (email.match(emailRegex)) {
        request()
      }
    },
    [dispatch, token],
  )

  if (status === 'no-email') {
    return (
      <PageContainer className={'centered'}>
        <section className={styles.Box}>
          <EmailRequest onSubmit={verifyEmail} />
        </section>
      </PageContainer>
    )
  }
  if (status === 'verify') {
    return (
      <PageContainer className={'centered'}>
        <section className={styles.Box}>
          <h2>Проверь почту!</h2>
          <p>
            Письмо с подтверждением должно скоро прийти. Оно будет действительно
            30 минут
          </p>
        </section>
      </PageContainer>
    )
  }

  return null
}

function check(
  location: Location,
): ThunkAction<
  Promise<
    | { needEmail: false }
    | {
        needEmail: true
        token: string
      }
  >
> {
  return async (dispatch) => {
    const params = new URLSearchParams(location.search)
    if (!params.has('status')) {
      dispatch(replace('/'))
      return { needEmail: false }
    }
    const status = params.get('status')

    switch (status) {
      case StatusCode.OK: {
        const action = params.get('action')
        // NOTE: check from params is taken in App component
        // This is needed to ensure check is set before the first
        // token request fires, maybe find a workaround in future

        await dispatch(initApp(params.get('check')))

        dispatch(
          notifyInfo(
            action === 'link'
              ? LangNotifications.link
              : LangNotifications.signin,
          ),
        )
        dispatch(replace(profile()))

        const provider = params.get('provider')
        if (['google', 'vk', 'facebook'].includes(provider as string)) {
          gtag('event', 'login', {
            method: provider,
          })
          // ym()
        }

        return { needEmail: false }
      }
      case StatusCode.VERIFICATION: {
        if (!params.has('token')) {
          dispatch(replace(profile()))
          return { needEmail: false }
        }

        const token = params.get('token')!
        dispatch(verifyEmail(token))
        return { needEmail: false }
      }
      case StatusCode.NO_EMAIL: {
        if (!params.has('token')) {
          dispatch(replace(profile()))
          return { needEmail: false }
        }
        const token = params.get('token')!
        dispatch(notifyInfo(LangNotifications.noEmail))
        return { token, needEmail: true }
      }
      case StatusCode.UNAUTHENTICATED:
        dispatch(unauthenticate())
        dispatch(notifyError(LangErrors.unauthenticated))
        break
      case StatusCode.INVALID_TOKEN:
        dispatch(notifyError(LangErrors.invalidToken))
        break
      case StatusCode.MISSING_PARAMETER:
        dispatch(notifyError(LangErrors.missingParameter))
        break
      case StatusCode.MISSING_SCOPE:
        dispatch(notifyError(LangErrors.missingScope))
        break
      default:
        dispatch(notifyError(LangErrors.unknown))
    }
    dispatch(replace(profile()))
    return { needEmail: false }
  }
}

function verifyEmail(token: string): ThunkAction {
  return async (dispatch) => {
    dispatch(openLoading(AUTH_LOADING))

    try {
      await ApiClient.post<VerifyEmailResponse>(Endpoints.Auth.verifyEmail, {
        credentials: 'include',
        mode: 'cors',
        json: { token },
      })
    } catch (e) {
      dispatch(handleRequestError(e))
    } finally {
      dispatch(closeLoading(AUTH_LOADING))
      dispatch(replace('/profile'))
    }
  }
}
