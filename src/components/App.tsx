import { Router } from './Router'
import { authenticate, unauthenticate } from 'store/auth'
import { hideLoading } from 'store/view'
import { useDispatch } from 'react-redux'
import ApiClient, { AuthEvent } from 'services/client'
import NotificationToaster, {
  CookiesNotification,
} from './shared/NotificationToaster'
import React, { useEffect, useState } from 'react'
import RouteLoading from './shared/RouteLoading'
import ShapesManager from './ShapesManager'
import initApp from 'store/view/init-action'
import useRoute from 'hooks/shared/use-route'

const getMaintenanceComponent = () =>
  import('components/pages/Maintenance').then((x) => x.Maintenance)

export function App({ maintenance }: { maintenance?: boolean }) {
  const dispatch = useDispatch()
  const route = useRoute()
  const [Maintenance, setMaintenance] = useState<React.ComponentType>(
    () => () => null,
  )

  useEffect(() => {
    if (!maintenance) {
      // Defining event listener before query, because if check is absent
      // event can might fire before the listener is bound
      const setUser = (e: AuthEvent) => {
        if (e.detail) {
          dispatch(authenticate(e.detail))
        } else {
          dispatch(unauthenticate())
        }
      }
      ApiClient.addEventListener('authenticate', setUser)

      if (!route?.performsInitialization) {
        dispatch(initApp())
      }
      return () => ApiClient.removeEventListener('authenticate', setUser)
    } else {
      getMaintenanceComponent().then((Component) => {
        setMaintenance(() => Component)
        dispatch(hideLoading('App'))
      })
    }
    // App shouldn't reinitialize with location changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, maintenance])

  if (maintenance) {
    return <Maintenance />
  }

  return (
    <div id={'app'}>
      <Router />
      <RouteLoading />
      <ShapesManager />
      <CookiesNotification />
      <NotificationToaster />
    </div>
  )
}
