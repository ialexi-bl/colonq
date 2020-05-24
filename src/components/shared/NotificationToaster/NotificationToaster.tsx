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
      const hash = notification.hash
      const timeout = setTimeout(() => {
        current.current?.hash === hash && dispatch(closeNotification())
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
          key={notification.hash}
          appear
        >
          <Notification notification={notification} close={close} />
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}
