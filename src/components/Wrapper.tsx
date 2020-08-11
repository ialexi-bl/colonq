import { App } from './App'
import { Boundary } from './pages/Boundary'
import { ConnectedRouter } from 'connected-react-router'
import { Provider as ReduxProvider } from 'react-redux'
import { history, store } from 'store'
import { hot } from 'react-hot-loader/root'
import React, { ReactNode } from 'react'

export const Wrapper = hot(function Wrapper({
  children,
  maintenance,
  applyClassName,
}: {
  children?: ReactNode
  maintenance?: boolean
  applyClassName: (className: string) => unknown
}) {
  return (
    <Boundary applyClassName={applyClassName} global>
      <ReduxProvider store={store}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </ReduxProvider>
    </Boundary>
  )
})
