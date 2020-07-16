import { CleanButton } from 'components/shared/Button'
import React from 'react'
import cn from 'clsx'
import styles from './AnswerButton.module.scss'

export type AnswerButtonProps = HTMLProps.button & {
  incorrect?: boolean
  correct?: boolean
}

const AnswerButton = ({
  incorrect,
  className,
  correct,
  ...props
}: AnswerButtonProps) => (
  <CleanButton
    className={cn(styles.AnswerButton, className, {
      [styles.correct]: correct,
      [styles.incorrect]: incorrect,
    })}
    {...props}
  />
)
export default AnswerButton
