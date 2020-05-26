import {
  CookiesNotification,
  NotificationToaster,
} from './shared/NotificationToaster'
import { RouteLoading } from './shared/Loading'
import { Router } from './Router'
import { Sidebar } from './shared/Sidebar'
import { auth, verifyEmail } from 'config/routes'
import { authenticate, unauthenticate } from 'store/auth'
import { hideLoading, notifyError } from 'store/view'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import ApiClient, { AuthEvent } from 'services/client'
import LangErrors from 'lang/errors.json'
import React, { useEffect, useState } from 'react'

const getMaintenanceComponent = () =>
  import('components/pages/Maintenance').then((x) => x.Maintenance)

export function App({ maintenance }: { maintenance?: boolean }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const [Maintenance, setMaintenance] = useState<React.ComponentType>(
    () => () => null,
  )

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log(e)
    })
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

      // Ensure `check` parameter on auth page is set before token request
      if (location.pathname === auth()) {
        const params = new URLSearchParams(location.search)
        if (params.has('check')) {
          ApiClient.check = params.get('check')
        }
      }

      // Credentials are received during email verification
      if (location.pathname !== verifyEmail()) {
        ApiClient.init()
          .catch((e) => {
            if (e.name === 'NoStorageError') {
              dispatch(notifyError(LangErrors.noStorage))
            } else {
              dispatch(notifyError(LangErrors.network))
            }

            dispatch(unauthenticate())
          })
          .then(() => {
            dispatch(hideLoading('App'))
          })
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
      <Sidebar />
      <Router />
      <RouteLoading />
      <CookiesNotification />
      <NotificationToaster />
    </div>
  )
}
