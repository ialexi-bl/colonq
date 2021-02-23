import { AppState } from 'store/types'
import { login } from 'config/routes'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

/**
 * Redirects to specified page (login by default) if user is not authenticated
 * @param redirect - Redirect path (false to prevent redirection)
 * @returns - Whether the page should be displayed
 */
export default function useIsAuthenticated(
  redirect: string | false = login(),
): boolean {
  const dispatch = useDispatch()
  const status = useSelector((state: AppState) => state.user.status)

  useEffect(() => {
    if (redirect && (status === 'error' || status === 'unauthenticated')) {
      dispatch(
        push(redirect, {
          // If there was an error fetching the token
          // allow `Router` to redirect user back if
          // they are authorized but had problem with internet
          redirectedFromFailedAuth: status === 'error',
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, redirect, status])

  return status === 'authenticated'
}
