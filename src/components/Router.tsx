import { AppState } from 'store/types'
import { Boundary } from './pages/Boundary'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { IS_PROD, REACT_APP_GA_ID } from 'config'
import { NotFound } from './pages/NotFound'
import {
  ROUTE_TRANSITION_CLASSNAME,
  ROUTE_TRANSITION_DURATION,
} from 'config/view'
import { Route, Switch, useLocation } from 'react-router-dom'
import { hideLoading, hideNonRouterLoading, showLoading } from 'store/view'
import { routesArray } from 'config/routes'
import { useDispatch, useSelector } from 'react-redux'
import Page from './shared/Page'
import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import useUpdateTracker from 'hooks/shared/use-update-tracker'

declare var gtag: Gtag.Gtag

export function Router() {
  const location = useLocation()
  const dispatch = useDispatch()
  const [initialized, setInitialized] = useState(false)
  const { loading } = useSelector((state: AppState) => state.auth)

  useEffect(() => {
    if (!loading) setInitialized(true)
  }, [loading])
  // Normal useEffect doesn't work, because children open loading
  // on route change faster, than Router closes all previous loadings
  useLayoutEffect(() => {
    dispatch(hideNonRouterLoading())

    if (IS_PROD) {
      gtag('config', REACT_APP_GA_ID, {
        page_path: location.pathname,
      })
    }
  }, [dispatch, location.pathname])

  useUpdateTracker('Router', {
    dispatch,
    initialized,
    loading,
    location,
  })

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
            <Suspense fallback={<Fallback />}>
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
