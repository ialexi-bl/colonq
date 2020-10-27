import { AppState } from 'store/types'
import { register } from 'config/routes'
import { replace } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

/**
 * Redirects to specified page (default - index) if user is not authenticated
 * @param redirect - Redirect path
 * @returns - Whether the page should be displayed
 */
export default function useIsAuthenticated(redirect = register()) {
  const dispatch = useDispatch()
  const { status } = useSelector((state: AppState) => state.user)

  useEffect(() => {
    if (status === 'unauthenticated') {
      dispatch(replace(redirect))
    }
  }, [dispatch, redirect, status])

  return status === 'authenticated'
}
