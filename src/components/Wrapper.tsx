import { ConnectedRouter } from 'connected-react-router'
import { Provider as ReduxProvider } from 'react-redux'
import { ServicesContext } from 'context/services'
import { history, store } from 'store'
import { hot } from 'react-hot-loader/root'
import ApiClient from 'services/client'
import AppsService from 'services/apps-service/AppsService'
import Boundary from './pages/Boundary'
import React, { ReactNode } from 'react'
import UserService from 'services/user-service/UserService'

const apiClient = new ApiClient()
const services = {
  apiClient,
  userService: new UserService(apiClient),
  appsService: new AppsService(apiClient),
}

export const Wrapper = hot(function Wrapper({
  children,
  applyClassName,
}: {
  children?: ReactNode
  applyClassName: (className: string) => unknown
}) {
  return (
    <Boundary applyClassName={applyClassName} global>
      <ReduxProvider store={store}>
        <ServicesContext.Provider value={services}>
          <ConnectedRouter history={history}>{children}</ConnectedRouter>
        </ServicesContext.Provider>
      </ReduxProvider>
    </Boundary>
  )
})
