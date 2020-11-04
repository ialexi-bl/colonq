import React from 'react'
import cn from 'clsx'
import styles from './ErrorMessage.module.scss'
import useDifferentPrevious from 'hooks/use-different-previous'

export type Message =
  | string
  | {
      type: 'error' | 'warning'
      text: string
    }
type MaybeMessage = null | false | Message

export type ErrorMessageProps = HTMLProps.div & {
  message?: MaybeMessage
}

const text = (message: Message) =>
  typeof message === 'string' ? message : message.text
const type = (message: Message) =>
  typeof message === 'string' ? 'error' : message.type
const color = (message: Message) =>
  type(message) === 'error' ? 'text-error' : 'text-warning'
const compare = (a: MaybeMessage, b: MaybeMessage) =>
  !!a && !!b && text(a) === text(b)

/**
 * Displays error message for input fields
 * NOTE: on first render message should be null, string can cause bugs
 */
export default function ErrorMessage({
  message = null,
  className,
}: ErrorMessageProps) {
  const previous = useDifferentPrevious(message, compare)

  return (
    <div
      className={cn(
        'overflow-hidden relative w-full',
        className,
        styles.Container,
        message && styles.active,
      )}
    >
      {previous && (
        <div
          key={text(previous)}
          className={cn(
            'font-bold absolute top-0 inset-x-0',
            styles.ErrorMessage,
            styles.hidden,
            color(previous),
          )}
        >
          {text(previous)}
        </div>
      )}
      {message && (
        <div
          key={text(message)}
          className={cn('font-bold', styles.ErrorMessage, color(message))}
        >
          {text(message)}
        </div>
      )}
    </div>
  )
}
