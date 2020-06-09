import { usePrevious } from 'hooks/util/use-previous'
import React from 'react'
import cn from 'clsx'
import styles from './ErrorMessage.module.scss'

export type ErrorMessageProps = DivProps & { message?: string | null }

export const ErrorMessage = ({
  message = null,
  className,
}: ErrorMessageProps) => {
  const previous = usePrevious(message)

  return (
    <div className={cn(styles.Container, className, message && styles.active)}>
      {previous && (
        <div key={previous} className={cn(styles.ErrorMessage, styles.hidden)}>
          {previous}
        </div>
      )}
      {message && (
        <div key={message} className={styles.ErrorMessage}>
          {message}
        </div>
      )}
    </div>
  )
}
