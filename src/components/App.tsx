import { MixedDispatch } from 'store/types'
import { Router } from './Router'
import { closeLoading } from 'store/view'
import { useApiClient } from 'services/client'
import { useDispatch } from 'react-redux'
import NotificationToaster, {
  CookiesNotification,
} from './shared/NotificationToaster'
import React, { useEffect, useState } from 'react'
import RouteLoading from './shared/RouteLoading'
import ShapesManager from './ShapesManager'
import useRoute from 'hooks/shared/use-route'

const getMaintenanceComponent = () =>
  import('components/pages/Maintenance').then((x) => x.Maintenance)

export function App({ maintenance }: { maintenance?: boolean }) {
  const route = useRoute()
  const client = useApiClient()
  const dispatch = useDispatch<MixedDispatch>()
  const [Maintenance, setMaintenance] = useState<React.ComponentType>(
    () => () => null,
  )

  useEffect(() => {
    async function loadMaintenance() {
      const Component = await getMaintenanceComponent()
      setMaintenance(() => Component)
    }
    async function initialize() {
      if (route?.preventClientInitialization) return
      await client.initialize()
    }

    async function main() {
      if (maintenance) {
        await loadMaintenance()
      } else {
        await initialize()
      }
      dispatch(closeLoading('init'))
    }
    main()

    // This effect initializes app and is supposed to only
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
