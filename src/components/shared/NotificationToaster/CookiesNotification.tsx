import { CSSTransition } from 'react-transition-group'
import { Notification } from './Notification'
import { NotificationDescription } from 'store/view'
import React, { useState } from 'react'

export function CookiesNotification() {
  const [shown, setShown] = useState(() => {
    try {
      return localStorage.getItem(COOKIES_ACCEPTED) !== '1'
    } catch (e) {
      return false
    }
  })

  return (
    <CSSTransition
      in={shown}
      timeout={300}
      classNames={'notification'}
      unmountOnExit
      mountOnEnter
      appear
    >
      <Notification
        notification={notification}
        close={() => {
          localStorage.setItem(COOKIES_ACCEPTED, '1')
          setShown(false)
        }}
      />
    </CSSTransition>
  )
}

const COOKIES_ACCEPTED = 'cookies-accepted'
const notification: NotificationDescription = {
  type: 'info',
  hash: 0,
  text:
    'ColonQ использует файлы cookie для хранения данных. Продолжая использование, ты даёшь согласие на работу с ними',
}
