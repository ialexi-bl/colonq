import { ConnectedRouter } from 'connected-react-router'
import { Provider as ReduxProvider } from 'react-redux'
import { history, store } from 'store'
import { hot } from 'react-hot-loader/root'
import Boundary from './pages/Boundary'
import React, { ReactNode } from 'react'

export const Wrapper = hot(function Wrapper({
  children,
  applyClassName,
}: {
  children?: ReactNode
  applyClassName: (className: string) => unknown
}) {
  return (
    <ReduxProvider store={store}>
      <Boundary applyClassName={applyClassName} global>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </Boundary>
    </ReduxProvider>
  )
})
