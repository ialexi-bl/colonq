import { AppState } from 'store/types'
import { replace } from 'connected-react-router'
import { login } from 'config/routes'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

/**
 * Redirects to specified page (default - index) if user is not authenticated
 * @param redirect - Redirect path
 * @returns - Whether the page should be displayed
 */
export default function useIsAuthenticated(redirect = login()) {
  const dispatch = useDispatch()
  const { authenticated, loading } = useSelector(
    (state: AppState) => state.user,
  )

  useEffect(() => {
    if (!loading && !authenticated) {
      dispatch(replace(redirect))
    }
  }, [authenticated, dispatch, loading, redirect])

  return !loading && authenticated
}
