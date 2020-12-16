import { AppState } from 'store/types'
import { login } from 'config/routes'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

/**
 * Redirects to specified page (default - index) if user is not authenticated
 * @param redirect - Redirect path
 * @returns - Whether the page should be displayed
 */
export default function useIsAuthenticated(redirect: string | false = login()) {
  const dispatch = useDispatch()
  const { status, token } = useSelector((state: AppState) => state.user)

  useEffect(() => {
    if (redirect && status !== 'loading' && !token) {
      dispatch(push(redirect, { redirectedFromFailedAuth: status === 'error' }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, redirect, status, token])

  return token !== null
}
