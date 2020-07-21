import { NotificationType } from 'store/view'
import Close from 'components/icons/Close'
import React from 'react'
import cn from 'clsx'
import styles from './Notification.module.scss'

export type NotificationProps = {
  text: string
  type: NotificationType
  close: () => unknown
}

export function Notification({ text, type, close }: NotificationProps) {
  return (
    <div
      className={cn(styles.Notification, {
        [styles.error]: type === 'error',
      })}
    >
      <button
        className={styles.DismissButton}
        onClick={close}
        title={'Закрыть'}
      >
        <Close />
      </button>
      {text}
    </div>
  )
}
