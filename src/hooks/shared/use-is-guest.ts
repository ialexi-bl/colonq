import { AppState } from 'store/types'
import { appsList } from 'config/routes'
import { replace } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

/**
 * Redirects to specified page (default - index) if user is authenticated
 * @param redirect - Redirect path
 * @returns Whether the page should be displayed or not
 */
export default function useIsGuest(redirect = appsList()) {
  const dispatch = useDispatch()
  const { status } = useSelector((state: AppState) => state.user)

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(replace(redirect))
    }
  }, [dispatch, redirect, status])

  return status === 'unauthenticated'
}
