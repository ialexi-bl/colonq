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
      className={cn(
        styles.Notification,
        'z-notification pb-20 sm:pb-6 pt-6 px-8 shadow-md duration-300 leading-5',
        'fixed inset-x-0 bottom-0',
        type === 'error' ? 'bg-error' : 'bg-primary-900',
      )}
    >
      <button
        className={styles.DismissButton}
        onClick={close}
        title={'Закрыть'}
      >
        <Close />
      </button>
      <div className={'container mx-auto'}>{text}</div>
    </div>
  )
}
