import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Location } from 'history'
import {
  ROUTE_TRANSITION_CLASSNAME,
  ROUTE_TRANSITION_DURATION,
} from 'config/view'
import { Route, Switch, useLocation } from 'react-router-dom'
import { RouteComponentProps, routesArray } from 'config/routes'
import Boundary from './pages/Boundary'
import Config from 'config'
import LoadingBar from './shared/LoadingBar'
import NotFound from './pages/NotFound'
import React, { useCallback, useEffect, useRef } from 'react'
import cn from 'clsx'
import useForceUpdate from 'hooks/use-force-update'
import usePrevious from 'hooks/use-previous'

const VISIBLE_TIMEOUT = {
  exit: ROUTE_TRANSITION_DURATION,
  enter: 0,
}
const REAL_TIMEOUT = {
  exit: 0,
  enter: ROUTE_TRANSITION_DURATION,
}
declare const gtag: any

export default function Router({
  closeInitialLoading,
}: {
  closeInitialLoading: () => void
}) {
  const realLocation = useLocation()
  const {
    visibleLocation,
    setProgress,
    firstRenderDone,
    progress,
    loading,
    visible,
  } = useLocationControls(realLocation)

  useEffect(() => {
    if (Config.IS_PROD) {
      gtag('config', Config.REACT_APP_GA_ID, {
        page_path: realLocation.pathname,
      })
    }
  }, [realLocation.pathname])
  useEffect(() => {
    if (visible && firstRenderDone) {
      closeInitialLoading()
    }
  }, [closeInitialLoading, firstRenderDone, visible])

  return (
    <>
      <LoadingBar visible={loading} progress={progress / 100} />
      <div
        id={'animation-controller'}
        className={cn(
          'w-full h-full',
          !firstRenderDone && 'no-animation-start',
        )}
      >
        <TransitionGroup component={null}>
          <CSSTransition
            enter={false}
            key={visibleLocation.pathname}
            timeout={VISIBLE_TIMEOUT}
            classNames={ROUTE_TRANSITION_CLASSNAME}
          >
            <Routes
              visible={firstRenderDone ? true : visible}
              location={visibleLocation}
              setProgress={setProgress}
            />
          </CSSTransition>
          {visibleLocation !== realLocation && (
            <CSSTransition
              exit={false}
              key={realLocation.pathname}
              timeout={REAL_TIMEOUT}
              classNames={ROUTE_TRANSITION_CLASSNAME}
            >
              <Routes
                visible={visible}
                location={realLocation}
                setProgress={setProgress}
              />
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    </>
  )
}

function Routes({
  location,
  ...controls
}: { location: Location } & RouteComponentProps) {
  return (
    <Boundary>
      <Switch location={location}>
        {routesArray.map((route) => (
          <Route
            exact
            key={route.name}
            path={route.path}
            render={(data) => {
              // TODO: problem: for the same routes with multiple
              // components that can be loaded like for apps, this
              // loads the same after the first render because object is the same
              const key = route.getKey?.(data) || 'default'
              route._importStarted ||= {}
              route._imported ||= {}

              if (route._imported[key]) {
                const Component = route._imported[key]
                return <Component {...controls} {...data} />
              }
              if (!route._importStarted[key]) {
                route._importStarted[key] = true
                route.getComponent(data).then((m) => {
                  route._imported![key] = m.default
                  controls.setProgress(IMPORTED as any)
                })
              }
              return null
            }}
          />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Boundary>
  )
}

const IMPORTED: unique symbol = Symbol('imported')
function useLocationControls(realLocation: Location) {
  // Progress may never be less than 10
  const progress = useRef(10)
  const firstRenderDone = useRef(false)
  const forceUpdate = useForceUpdate()
  const visibleLocation = useRef(realLocation)
  const previousLocation = usePrevious(realLocation)
  const setProgress = useCallback(
    (value: number | typeof IMPORTED) => {
      if (value === IMPORTED) {
        progress.current = 10 + 40
      } else if (progress.current !== value) {
        progress.current = 10 + 40 + value / 2
      }
      forceUpdate()
    },
    [forceUpdate],
  )

  console.log('progress:', progress.current)
  if (previousLocation !== realLocation) {
    progress.current = 10
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
    setProgress,
  }
}
