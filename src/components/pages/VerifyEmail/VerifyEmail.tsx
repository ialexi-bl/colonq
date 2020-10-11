import { Endpoints } from 'config/endpoints'
import { MixedDispatch } from 'store/types'
import { VerifyEmailResponse } from 'response-types/auth'
import { authenticate, unauthenticate } from 'store/user'
import { handleRequestError } from 'services/errors/handle-request-error'
import { closeLoading, openLoading } from 'store/view'
import { replace } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import ApiClient from 'services/client'

const VERIFY_LOADING = 'VerifyEmail'
export default function VerifyEmail() {
  const dispatch = useDispatch<MixedDispatch>()
  const location = useLocation()

  useEffect(() => {
    async function request() {
      const token = new URLSearchParams(location.search).get('token')
      if (!token) return dispatch(replace('/'))

      dispatch(openLoading(VERIFY_LOADING))

      try {
        const response = await ApiClient.post<VerifyEmailResponse>(
          Endpoints.Auth.verifyEmail,
          {
            credentials: 'include',
            mode: 'cors',
            json: { token },
          },
        )

        ApiClient.setCredentials(response)
        dispatch(authenticate(response.data))
      } catch (e) {
        dispatch(handleRequestError(e))
      } finally {
        dispatch(unauthenticate())
        dispatch(closeLoading(VERIFY_LOADING))
        dispatch(replace('/profile'))
      }
    }
    request()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
