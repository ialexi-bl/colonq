import { AppState, MixedDispatch } from 'store/types'
import { appsList, login } from 'config/routes'
import {
  closeLoading,
  notifyErrorObject,
  notifyInfo,
  openLoading,
} from 'store/view'
import { getTokenPayload } from 'util/jwt'
import { push, replace } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useUserService } from 'services/user-service'

export default function VerifyEmail() {
  const dispatch = useDispatch<MixedDispatch>()
  const location = useLocation()
  const authStatus = useSelector((state: AppState) => state.user.status)
  const userService = useUserService()

  useEffect(() => {
    async function request() {
      const token = new URLSearchParams(location.search).get('token')
      if (!token) return dispatch(replace('/'))

      dispatch(openLoading('verify-email'))

      try {
        await userService.verifyEmail(token)

        dispatch(notifyInfo('Email подтверждён'))

        if (authStatus === 'authenticated') {
          push(appsList())
        } else {
          let email = ''
          try {
            email = getTokenPayload(token).email
          } catch (e) {
            // TODO: remove console.warn and send logs to server
            console.warn(
              `Couldn't get email from email verification token: "${token}"`,
            )
          }

          dispatch(push(login(), { email }))
        }
      } catch (e) {
        dispatch(notifyErrorObject(e))
      } finally {
        dispatch(closeLoading('verify-email'))
      }
    }

    if (authStatus !== 'loading') {
      request()
    }
  }, [authStatus]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
