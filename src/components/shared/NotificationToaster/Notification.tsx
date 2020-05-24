import { CleanButton } from 'components/shared/Button'
import { Close } from 'components/icons/Close'
import { NotificationDescription } from 'store/view'
import React from 'react'
import cn from 'clsx'
import styles from './Notification.module.scss'

export function Notification({
  notification,
  close,
}: {
  notification: NotificationDescription
  close: () => unknown
}) {
  return (
    <div
      className={cn(styles.Container, {
        [styles.Error]: notification.type === 'error',
      })}
    >
      <CleanButton className={styles.Close} onClick={close}>
        <Close />
      </CleanButton>
      {notification.text}
    </div>
  )
}
