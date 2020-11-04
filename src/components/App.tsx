import { AppState, MixedDispatch } from 'store/types'
import { Router } from './Router'
import { closeLoading } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import Navigation from './shared/Navigation'
import NotificationToaster, {
  CookiesNotification,
} from './shared/NotificationToaster'
import React, { useEffect, useState } from 'react'
import RouteLoading from './shared/RouteLoading'
import ShapesManager from './ShapesManager'

const getMaintenanceComponent = () =>
  import('components/pages/Maintenance').then((x) => x.Maintenance)

export function App({ maintenance }: { maintenance?: boolean }) {
  const status = useSelector((state: AppState) => state.user.status)
  const dispatch = useDispatch<MixedDispatch>()
  const [Maintenance, setMaintenance] = useState<React.ComponentType>(
    () => () => null,
  )

  useEffect(() => {
    if (!maintenance) return
    getMaintenanceComponent().then((Component) => {
      setMaintenance(() => Component)
      dispatch(closeLoading('init'))
    })
  }, [dispatch, maintenance])

  useEffect(() => {
    if (status !== 'loading') {
      dispatch(closeLoading('init'))
    }
  }, [dispatch, status])

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
      <Navigation />
    </div>
  )
}
