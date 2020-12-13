import { AppState } from 'store/types'
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux'
import GlobalLoading from 'components/shared/GlobalLoading'
import Navigation from 'components/shared/Navigation'
import NotificationToaster, {
  CookiesNotification,
} from 'components/shared/NotificationToaster'
import Router from '../Router'
import ShapesManager from '../ShapesManager'

const getMaintenanceComponent = () =>
  import('components/pages/Maintenance').then((x) => x.Maintenance)
const reducer = () => false

function App({ maintenance }: { maintenance?: boolean }) {
  const status = useSelector((state: AppState) => state.user.status)
  const [loading, closeLoading] = useReducer(reducer, true)
  const [routerLoading, closeRouterLoading] = useReducer(reducer, true)
  const [Maintenance, setMaintenance] = useState<React.ComponentType>(
    () => () => null,
  )

  useEffect(() => {
    if (!maintenance) return
    getMaintenanceComponent().then((Component) => {
      setMaintenance(() => Component)
      closeLoading()
    })
  }, [maintenance])

  useEffect(() => {
    if (status !== 'loading') {
      closeLoading()
    }
  }, [status])

  if (maintenance) {
    return <Maintenance />
  }

  return (
    <>
      <Router closeInitialLoading={closeRouterLoading} />
      <GlobalLoading visible={loading || routerLoading} />
      <CookiesNotification />
      <NotificationToaster />
      <ShapesManager />
      <Navigation />
    </>
  )
}
export default App
