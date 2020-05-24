import { App } from './App'
import { Boundary } from './pages/Boundary'
import { ConnectedRouter } from 'connected-react-router'
import { Provider as ReduxProvider } from 'react-redux'
import { history, store } from 'store'
import { hot } from 'react-hot-loader/root'
import React from 'react'

export const Wrapper = hot(function Wrapper({
  maintenance,
  applyClassName,
}: {
  maintenance?: boolean
  applyClassName: (className: string) => unknown
}) {
  return (
    <Boundary applyClassName={applyClassName} global>
      <ReduxProvider store={store}>
        <ConnectedRouter history={history}>
          <App maintenance={maintenance} />
        </ConnectedRouter>
      </ReduxProvider>
    </Boundary>
  )
})
