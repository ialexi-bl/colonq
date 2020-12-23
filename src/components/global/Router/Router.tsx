import { AppState } from 'store/types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {
  ROUTE_TRANSITION_CLASSNAME,
  ROUTE_TRANSITION_DURATION,
} from 'config/view'
import { goBack } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Config from 'config'
import LoadingBar from '../../shared/LoadingBar'
import Routes from './Routes'
import cn from 'clsx'
import useLocationControls from './use-location-controls'

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
  const dispatch = useDispatch()
  const status = useSelector((state: AppState) => state.user.status)
  const animationsEnabled = useSelector(
    (state: AppState) => state.view.animationsEnabled,
  )

  const realLocation = useLocation<{ redirectedFromFailedAuth?: boolean }>()
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
    if (visible && firstRenderDone) closeInitialLoading()
  }, [closeInitialLoading, firstRenderDone, visible])

  // Redirecting user to previous page if this one
  // was opened because user was authorized but had
  // problems with internet and was redirected to
  // login page
  useEffect(() => {
    if (
      status === 'authenticated' &&
      realLocation.state?.redirectedFromFailedAuth
    ) {
      dispatch(goBack())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realLocation])

  return (
    <>
      <LoadingBar visible={loading} progress={progress / 100} />
      <main
        id={'animation-controller'}
        className={cn(
          'w-full h-full',
          (!firstRenderDone || !animationsEnabled) && 'no-animation-start',
          !animationsEnabled && 'no-animation-end',
        )}
      >
        <TransitionGroup component={null}>
          {visibleLocation !== realLocation && (
            <CSSTransition
              // Here as well
              key={realKey}
              exit={false}
              enter={animationsEnabled}
              timeout={animationsEnabled ? REAL_TIMEOUT : 0}
              classNames={ROUTE_TRANSITION_CLASSNAME}
            >
              <Routes
                visible={visible}
                location={realLocation}
                setProgress={setProgress}
              />
            </CSSTransition>
          )}
          <CSSTransition
            key={visibleKey}
            exit={animationsEnabled}
            enter={false}
            timeout={animationsEnabled ? VISIBLE_TIMEOUT : 0}
            classNames={ROUTE_TRANSITION_CLASSNAME}
          >
            <Routes
              visible={firstRenderDone ? true : visible}
              location={visibleLocation}
              setProgress={setProgress}
            />
          </CSSTransition>
        </TransitionGroup>
      </main>
    </>
  )
}
