import { ConnectedRouter } from 'connected-react-router'
import { Provider as ReduxProvider } from 'react-redux'
import { history, store } from 'store'
import { hot } from 'react-hot-loader/root'
import ApiClient, { ApiClientProvider } from 'services/client'
import Boundary from './pages/Boundary'
import React, { ReactNode } from 'react'
import UserService, { UserServiceProvider } from 'services/user-service'

const apiClient = new ApiClient()
const userService = new UserService(apiClient)

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
        <ApiClientProvider client={apiClient}>
          <UserServiceProvider client={userService}>
            <ConnectedRouter history={history}>{children}</ConnectedRouter>
          </UserServiceProvider>
        </ApiClientProvider>
      </ReduxProvider>
    </Boundary>
  )
})
