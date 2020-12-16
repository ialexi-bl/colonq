import { hideNavigation, showNavigation } from 'store/view'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

/**
 * Disables navigation and enabled it when component
 * is unmounted
 */
export default function useHideNavigation(): void {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(hideNavigation())
    return () => {
      dispatch(showNavigation())
    }
  }, [dispatch])
}
