import { AppState } from 'store/types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Notification } from './Notification'
import { closeNotification } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useEffect, useRef } from 'react'

const selector = (state: AppState) => state.view.notification

/**
 * Toaster used by the entire application to display information
 * and errors
 */
export const NotificationToaster = () => {
  const dispatch = useDispatch()
  const current = useRef<AppState['view']['notification']>(null)
  const notification = (current.current = useSelector(selector))

  const close = useCallback(() => {
    dispatch(closeNotification())
  }, [dispatch])

  useEffect(() => {
    if (notification) {
      const { text } = notification
      const timeout = setTimeout(() => {
        if (current.current?.text === text) {
          dispatch(closeNotification())
        }
      }, 8000)

      return () => clearTimeout(timeout)
    }
  }, [dispatch, notification])

  return (
    <TransitionGroup component={null}>
      {notification && (
        <CSSTransition
          timeout={300}
          classNames={'notification'}
          key={notification.text}
          appear
        >
          <Notification
            text={notification.text}
            type={notification.type}
            close={close}
          />
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}
