import { disableAnimations, enableAnimations } from 'store/view'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default function useMediaTriggers() {
  const dispatch = useDispatch()

  useEffect(() => {
    function changeReducedMotion(mql: MediaQueryListEvent) {
      dispatch(mql.matches ? disableAnimations() : enableAnimations())
    }

    const reducedMotion = matchMedia('(prefers-reduced-motion:reduced)')
    reducedMotion.addEventListener('change', changeReducedMotion)
    // TODO: check if addeventlistener works in safari
    // TODO: probably implement increased contrast

    return () => {
      reducedMotion.removeEventListener('change', changeReducedMotion)
    }
  }, [dispatch])
}
