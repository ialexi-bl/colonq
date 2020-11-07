import { hideNavigation, showNavigation } from 'store/view'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default function useHideNavigation() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(hideNavigation())
    return () => {
      dispatch(showNavigation())
    }
  }, [dispatch])
}
