import { AppState } from 'store/types'
import { login } from 'config/routes'
import { replace } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

/**
 * Redirects to specified page (default - index) if user is not authenticated
 * @param redirect - Redirect path
 * @returns - Whether the page should be displayed
 */
export default function useIsAuthenticated(redirect = login()) {
  const dispatch = useDispatch()
  const { status, token } = useSelector((state: AppState) => state.user)

  useEffect(() => {
    if (status === 'unauthenticated') {
      dispatch(replace(redirect))
    }
  }, [dispatch, redirect, status])

  return token !== null
}
