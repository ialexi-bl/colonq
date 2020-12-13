/* eslint-disable react-hooks/rules-of-hooks */
import { Provider } from 'react-redux'
import { useValue } from 'react-cosmos/fixture'
import Button from '../Button'
import GlobalLoading from './FullscreenLoading'
import configureStore from 'redux-mock-store'

const getStore = configureStore()

export default () => {
  const [loading] = useValue('loading', { defaultValue: true })
  const store = getStore(() => ({
    view: { loading: loading ? ['App'] : [] },
  }))

  return (
    <Provider store={store as any}>
      <GlobalLoading />
      <Button style={{ margin: '1rem' }} onClick={() => alert('Click')}>
        I'm a button after RouteLoading
      </Button>
    </Provider>
  )
}
