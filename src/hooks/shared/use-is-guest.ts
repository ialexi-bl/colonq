import { AppState } from 'store/types'
import { index } from 'config/routes'
import { replace } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

/**
 * Redirects to specified page (default - index) if user is authenticated
 * @param redirect - Redirect path
 * @returns Whether the page should be displayed or not
 */
export default function useIsGuest(redirect = index()) {
  const dispatch = useDispatch()
  const { authenticated, loading } = useSelector(
    (state: AppState) => state.user,
  )

  useEffect(() => {
    if (!loading && authenticated) {
      dispatch(replace(redirect))
    }
  }, [authenticated, dispatch, loading, redirect])

  return !loading && !authenticated
}
