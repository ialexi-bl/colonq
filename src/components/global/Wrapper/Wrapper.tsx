import { ConnectedRouter } from 'connected-react-router'
import { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { history, store } from 'store'
import { hot } from 'react-hot-loader/root'
import Boundary from 'components/pages/Boundary'

const Wrapper = hot(function Wrapper({ children }: { children?: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <Boundary global>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </Boundary>
    </ReduxProvider>
  )
})
export default Wrapper
