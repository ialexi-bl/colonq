import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Location } from 'history'
import {
  ROUTE_TRANSITION_CLASSNAME,
  ROUTE_TRANSITION_DURATION,
} from 'config/view'
import { Route, Switch, useLocation } from 'react-router-dom'
import { RouteComponentProps, routesArray } from 'config/routes'
import { useCallback, useEffect, useRef } from 'react'
import Boundary from '../../pages/Boundary'
import Config from 'config'
import LoadingBar from '../../shared/LoadingBar'
import LoadingErrorPage from './LoadingErrorPage'
import NotFound from 'components/pages/NotFound'
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
/**
 * Displays routes, manages how they are loaded and shown,
 * displays progress bar and provides classes for routes
 * transitions
 */
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
    realKey,
    visibleKey,
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
      <main
        id={'animation-controller'}
        className={cn(
          'w-full h-full',
          !firstRenderDone && 'no-animation-start',
        )}
      >
        <TransitionGroup component={null}>
          {/*  NOTE: verification is needed that using location key here 
          doesn't lead to any errors. Pathname cannot be used here because
          key should be unique for each app rerender otherwise there can be a
          "stuck" position when the route that has just been left is returned
          to and it doesn't rerender when it should, so it doesn't set progress
          to 100 and the app does nothing */}
          <CSSTransition
            enter={false}
            key={visibleKey}
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
              // Here as well
              key={realKey}
              exit={false}
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
      </main>
    </>
  )
}

/**
 * Displays all app routes and manages their loading process
 */
const Routes = function Routes({
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
              const key = route.getKey?.(data) || 'default'
              route._importStarted ||= {}
              route._imported ||= {}

              if (route._imported[key]) {
                const Component = route._imported[key]
                return <Component {...controls} {...data} />
              }
              if (!route._importStarted[key]) {
                // Preventing route from being imported multiple times
                route._importStarted[key] = true
                route
                  .getComponent(data)
                  .catch(() => {
                    route._importStarted![key] = false

                    const retry = () => {}
                    return {
                      default: () => (
                        <LoadingErrorPage retry={retry} {...controls} />
                      ),
                    }
                  })
                  .then((m) => {
                    route._imported![key] = m.default
                    controls.setProgress('_imported' as any)
                  })
                // TODO: handle
              }
              return null
            }}
          />
        ))}
        <Route render={() => <NotFound {...controls} />} />
      </Switch>
    </Boundary>
  )
}

const routerKey: unique symbol =
  typeof Symbol === 'undefined' ? ('__routerKey' as any) : Symbol('routerKey')
type ExtendedLocation = Location & { [routerKey]?: number }

/**
 * Controls how the routes are displayed: returns what
 * route is visible now, what is the next route to be rendered,
 * what is the loading progress and a function to control this progress
 * @param realLocation
 */
function useLocationControls(realLocation: ExtendedLocation) {
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
