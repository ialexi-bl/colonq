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
import LoadingBar from '../../shared/LoadingBar'
import Routes from './Routes'
import cn from 'clsx'
import useLocationControls from './use-location-controls'

const VISIBLE_TIMEOUT = {
  exit: ROUTE_TRANSITION_DURATION,
  enter: ROUTE_TRANSITION_DURATION,
}
const REAL_TIMEOUT = {
  exit: 0,
  enter: ROUTE_TRANSITION_DURATION,
}

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
    setProgressVisible,
    setProgressReal,
    visibleLocation,
    firstRenderDone,
    changedPages,
    visibleKey,
    progress,
    loading,
    visible,
    realKey,
  } = useLocationControls(realLocation)

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
  }, [status, realLocation])

  return (
    <>
      <LoadingBar visible={loading} progress={progress / 100} />
      <main
        id={'animation-controller'}
        className={cn(
          'w-full h-full',
          (!changedPages || !animationsEnabled) && 'no-animation-start',
          !animationsEnabled && 'no-animation-end',
        )}
      >
        <TransitionGroup component={null}>
          {visibleLocation !== realLocation && (
            <CSSTransition
              key={realKey}
              exit={false}
              enter={animationsEnabled}
              timeout={animationsEnabled ? REAL_TIMEOUT : 0}
              classNames={ROUTE_TRANSITION_CLASSNAME}
            >
              <Routes
                visible={visible}
                location={realLocation}
                setProgress={setProgressReal}
              />
            </CSSTransition>
          )}
          <CSSTransition
            key={visibleKey}
            exit={animationsEnabled}
            // enter={false}
            timeout={animationsEnabled ? VISIBLE_TIMEOUT : 0}
            classNames={ROUTE_TRANSITION_CLASSNAME}
          >
            <Routes
              visible={firstRenderDone ? true : visible}
              location={visibleLocation}
              setProgress={setProgressVisible}
            />
          </CSSTransition>
        </TransitionGroup>
      </main>
    </>
  )
}
