import { CSSTransition, TransitionGroup } from 'react-transition-group'
import React from 'react'
import cn from 'clsx'
import styles from './ErrorMessage.module.scss'

const TIMEOUT = parseInt(styles.timeout)
const CLASS_NAME = styles.className

export type ErrorMessageProps = DivProps & { message?: string | null }

export default React.memo(
  ({ message = null, className }: ErrorMessageProps) => (
    <div className={cn(styles.Container, message && styles.Active, className)}>
      <TransitionGroup component={null}>
        {message && (
          <CSSTransition
            timeout={TIMEOUT}
            classNames={CLASS_NAME}
            key={message}
          >
            <div className={styles.ErrorMessage}>{message}</div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  ),
)
