import { AppState } from 'store/types'
import { appsList } from 'config/routes'
import { replace } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Redirects to specified page (appsList by default) if user is authenticated
 * @param redirect - Redirect path
 * @returns Whether the page should be displayed or not
 */
export default function useIsGuest(redirect = appsList()): boolean {
  const dispatch = useDispatch()
  const location = useLocation<{ redirectedFromFailedAuth?: boolean }>()
  const status = useSelector((state: AppState) => state.user.status)

  useEffect(() => {
    if (
      status === 'authenticated' &&
      !location.state?.redirectedFromFailedAuth
    ) {
      console.log('Replacing')
      dispatch(replace(redirect))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, redirect, status])

  return status === 'unauthenticated' || status === 'error'
}
