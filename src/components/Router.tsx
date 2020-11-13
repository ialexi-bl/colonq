import { AppState } from 'store/types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {
  ROUTE_TRANSITION_CLASSNAME,
  ROUTE_TRANSITION_DURATION,
} from 'config/view'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { closePageSpecificLoading } from 'store/view'
import { routesArray } from 'config/routes'
import { useDispatch, useSelector } from 'react-redux'
import Boundary from './pages/Boundary'
import Config from 'config'
import NotFound from './pages/NotFound'
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import SuspenseLoading from './shared/SuspenseLoading'
import cn from 'clsx'

declare const gtag: any
// These are created outside of component not to map this array on every render
const routesElements = routesArray.map((route) => {
  const props: any =
    'component' in route
      ? { component: route.component }
      : { render: route.render }
  return <Route path={route.path} key={route.name} exact {...props} />
})

export function Router() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { current: firstKey } = useRef(location.key)
  const [initialized, setInitialized] = useState(false)
  const { status } = useSelector((state: AppState) => state.user)

  useEffect(() => {
    if (status !== 'loading') setInitialized(true)
  }, [status])

  // Normal useEffect doesn't work, because children open loading
  // on route change faster, than Router closes all previous loadings
  useLayoutEffect(() => {
    dispatch(closePageSpecificLoading())

    if (Config.IS_PROD) {
      gtag('config', Config.REACT_APP_GA_ID, {
        page_path: location.pathname,
      })
    }
  }, [dispatch, location.pathname])

  return (
    <div
      id={'animation-controller'}
      className={cn(
        'w-full h-full',
        location.key === firstKey && 'no-animation-start',
      )}
    >
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.pathname}
          timeout={ROUTE_TRANSITION_DURATION}
          classNames={ROUTE_TRANSITION_CLASSNAME}
          enter={initialized}
          exit={initialized}
        >
          {/* <Page> */}
          <Boundary>
            <Suspense fallback={<SuspenseLoading id={'route-loading'} />}>
              <Switch location={location}>
                {routesElements}
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </Boundary>
          {/* </Page> */}
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}
