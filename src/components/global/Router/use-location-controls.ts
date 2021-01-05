import { Location } from 'history'
import { useRef } from 'react'
import useForceUpdate from 'hooks/use-force-update'
import usePrevious from 'hooks/use-previous'

const routerKey: unique symbol =
  typeof Symbol === 'undefined' ? ('__routerKey' as any) : Symbol('routerKey')
export type ExtendedLocation = Location & {
  [routerKey]?: {
    key: number
    setProgress: (value: number) => void
  }
}

/**
 * Controls how the routes are displayed: returns what
 * route is visible now, what is the next route to be rendered,
 * what is the loading progress and a function to control this progress
 * @param realLocation
 */
export default function useLocationControls(realLocation: ExtendedLocation) {
  // Progress may never be less than 10
  const progress = useRef(10)
  const changedPages = useRef<boolean | 1 | 2>(false)
  const firstRenderDone = useRef(false)

  const forceUpdate = useForceUpdate()
  const visibleLocation = useRef(realLocation)
  const previousLocation = usePrevious(realLocation)

  if (!(routerKey in realLocation)) {
    realLocation[routerKey] = {
      key: ~~(Math.random() * 1e4),
      setProgress: ((location) => (value: number | '_imported') => {
        if (firstRenderDone.current && location === visibleLocation.current) {
          return
        }

        if (value === '_imported') {
          progress.current = 10 + 40
        } else if (progress.current !== value) {
          progress.current = 10 + 40 + value / 2
        }
        forceUpdate()
      })(realLocation),
    }
  }

  if (previousLocation.pathname !== realLocation.pathname) {
    if (changedPages.current === 1) changedPages.current = 2
    progress.current = 10
  }
  // Prevents rerendering when location object is changed but pages is not
  else if (previousLocation !== realLocation) {
    realLocation[routerKey] = visibleLocation.current[routerKey]
    visibleLocation.current = realLocation
  }

  if (progress.current >= 100) {
    if (changedPages.current === 2) changedPages.current = true
    else if (!changedPages.current) changedPages.current ||= 1

    firstRenderDone.current = true
    visibleLocation.current = realLocation
  }

  return {
    setProgressVisible: visibleLocation.current[routerKey]!.setProgress,
    setProgressReal: realLocation[routerKey]!.setProgress,
    visibleLocation: visibleLocation.current,
    firstRenderDone: firstRenderDone.current,
    changedPages: changedPages.current === true,
    visibleKey: visibleLocation.current[routerKey]!.key,
    progress: progress.current,
    visible: progress.current >= 100,
    loading: visibleLocation.current !== realLocation,
    realKey: realLocation[routerKey]!.key,
  }
}
