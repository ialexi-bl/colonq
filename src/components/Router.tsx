import { AppState } from 'store/types'
import { Boundary } from './pages/Boundary'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { NotFound } from './pages/NotFound'
import { Page } from './shared/Page'
import { REACT_APP_GA_ID } from 'config'
import {
  ROUTE_TRANSITION_CLASSNAME,
  ROUTE_TRANSITION_DURATION,
} from 'config/view'
import { Route, Switch, useLocation } from 'react-router-dom'
import { getRouteKey, routes } from 'config/routes'
import { hideLoading, hideNonRouterLoading, showLoading } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import React, { Suspense, useEffect, useState } from 'react'

declare var gtag: Gtag.Gtag

export function Router() {
  const location = useLocation()
  const dispatch = useDispatch()
  const [initialized, setInitialized] = useState(false)
  const { authenticated, loading } = useSelector(
    (state: AppState) => state.auth,
  )

  useEffect(() => {
    if (!loading) setInitialized(true)
  }, [loading])
  useEffect(() => {
    dispatch(hideNonRouterLoading())
  }, [location.pathname, dispatch])
  useEffect(() => {
    gtag('config', REACT_APP_GA_ID, {
      page_path: location.pathname,
    })
  }, [location.pathname])

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={getRouteKey(location.pathname, authenticated)}
        timeout={ROUTE_TRANSITION_DURATION}
        classNames={ROUTE_TRANSITION_CLASSNAME}
        enter={initialized}
        exit={initialized}
      >
        <Page>
          <Boundary>
            <Suspense fallback={<Fallback />}>
              <Switch location={location}>
                <Route {...routes.app} />
                <Route {...routes.auth} />
                <Route {...routes.index} />
                <Route {...routes.feedback} />
                <Route {...routes.verifyEmail} />
                <Route {...routes.user} />
                <Route {...routes.signin} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </Boundary>
        </Page>
      </CSSTransition>
    </TransitionGroup>
  )
}

function Fallback() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(showLoading('Router'))
    return () => {
      dispatch(hideLoading('Router'))
    }
  }, [dispatch])

  return null
}
