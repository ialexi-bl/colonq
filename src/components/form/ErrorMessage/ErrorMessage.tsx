import React from 'react'
import cn from 'clsx'
import styles from './ErrorMessage.module.scss'
import usePrevious from 'hooks/shared/use-previous'

export type ErrorMessageProps = HTMLProps.div & {
  message?: string | null
}

export default function ErrorMessage({
  message = null,
  className,
}: ErrorMessageProps) {
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
