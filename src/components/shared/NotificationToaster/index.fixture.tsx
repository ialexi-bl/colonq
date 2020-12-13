/* eslint-disable react-hooks/rules-of-hooks */
import { CookiesNotification } from './CookiesNotification'
import { Notification } from './Notification'
import { Provider } from 'react-redux'
import { useValue } from 'react-cosmos/fixture'
import Button from '../Button'
import NotificationToaster from './Toaster'
import configureStore from 'redux-mock-store'

const notification = (type: 'info' | 'error') => () => {
  const [open, setOpen] = useValue('open', { defaultValue: true as boolean })

  return !open ? null : (
    <Notification
      text={"I'm a notification"}
      type={type}
      close={() => setOpen(false)}
    />
  )
}

export default {
  Notification: notification('info'),
  'Error Notification': notification('error'),
  'Notification Toaster': () => {
    const [text, setText] = useValue<string | null>('text', {
      defaultValue: "I'm a notification",
    })
    const [type] = useValue('type', {
      defaultValue: 'info',
    })

    const store = configureStore([
      () => (next) => (action) => {
        if (action.type === 'CLOSE_NOTIFICATION') {
          setText(null)
        }

        return next(action)
      },
    ])(() => ({
      view: {
        notification: text && { text, type },
      },
    }))

    return (
      <Provider store={store}>
        <NotificationToaster />
        <Button
          onClick={() => setText("I'm a notification")}
          style={{ margin: '30vh 1rem' }}
        >
          Open notification
        </Button>
      </Provider>
    )
  },
  'Cookie Notification': () => {
    return (
      <div>
        <CookiesNotification />
        <Button
          onClick={() => localStorage.removeItem('cookies-accepted')}
          style={{ margin: '30vh 1rem' }}
        >
          Clear storage
        </Button>
      </div>
    )
  },
}
