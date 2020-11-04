import { AppState } from 'store/types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {
  ROUTE_TRANSITION_CLASSNAME,
  ROUTE_TRANSITION_DURATION,
} from 'config/view'
import { Route, Switch, useLocation } from 'react-router-dom'
import { closePageSpecificLoading } from 'store/view'
import { routesArray } from 'config/routes'
import { useDispatch, useSelector } from 'react-redux'
import Boundary from './pages/Boundary'
import Config from 'config'
import NotFound from './pages/NotFound'
import Page from './shared/Page'
import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import SuspenseLoading from './shared/SuspenseLoading'

declare var gtag: any

export function Router() {
  const location = useLocation()
  const dispatch = useDispatch()
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
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname}
        timeout={ROUTE_TRANSITION_DURATION}
        classNames={ROUTE_TRANSITION_CLASSNAME}
        enter={initialized}
        exit={initialized}
      >
        <Page>
          <Boundary>
            <Suspense fallback={<SuspenseLoading id={'route-loading'} />}>
              <Switch location={location}>
                {routesArray.map((route) => {
                  const props: any =
                    'component' in route
                      ? { component: route.component }
                      : { render: route.render }

                  return (
                    <Route
                      path={route.path}
                      key={route.name}
                      exact
                      {...props}
                    />
                  )
                })}
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </Boundary>
        </Page>
      </CSSTransition>
    </TransitionGroup>
  )
}
