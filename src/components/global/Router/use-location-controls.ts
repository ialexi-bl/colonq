import { Location } from 'history'
import { useCallback, useRef } from 'react'
import useForceUpdate from 'hooks/use-force-update'
import usePrevious from 'hooks/use-previous'

const routerKey: unique symbol =
  typeof Symbol === 'undefined' ? ('__routerKey' as any) : Symbol('routerKey')
export type ExtendedLocation = Location & { [routerKey]?: number }

/**
 * Controls how the routes are displayed: returns what
 * route is visible now, what is the next route to be rendered,
 * what is the loading progress and a function to control this progress
 * @param realLocation
 */
export default function useLocationControls(realLocation: ExtendedLocation) {
  if (!(routerKey in realLocation)) {
    realLocation[routerKey] = ~~(Math.random() * 1e4)
  }
  // Progress may never be less than 10
  const progress = useRef(10)
  const firstRenderDone = useRef(false)
  const forceUpdate = useForceUpdate()
  const visibleLocation = useRef(realLocation)
  const previousLocation = usePrevious(realLocation)
  const setProgress = useCallback(
    (value: number | '_imported') => {
      if (value === '_imported') {
        progress.current = 10 + 40
      } else if (progress.current !== value) {
        progress.current = 10 + 40 + value / 2
      }
      forceUpdate()
    },
    [forceUpdate],
  )

  if (previousLocation.pathname !== realLocation.pathname) {
    progress.current = 10
  }
  // Prevents rerendering when location object is changed but pages is not
  else if (previousLocation !== realLocation) {
    realLocation[routerKey] = visibleLocation.current[routerKey]
    visibleLocation.current = realLocation
  }

  if (progress.current >= 100) {
    firstRenderDone.current = true
    visibleLocation.current = realLocation
  }

  return {
    visibleLocation: visibleLocation.current,
    progress: progress.current,
    visible: progress.current >= 100,
    loading: visibleLocation.current !== realLocation,
    firstRenderDone: firstRenderDone.current,
    visibleKey: visibleLocation.current[routerKey]!,
    realKey: realLocation[routerKey]!,
    setProgress,
  }
}
