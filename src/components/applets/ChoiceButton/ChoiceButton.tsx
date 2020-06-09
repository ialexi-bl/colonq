import { cleanButton } from 'components/shared/Button'
import React from 'react'
import cn from 'clsx'
import styles from './ChoiceButton.module.scss'

export type ChoiceButtonProps = ButtonProps & {
  correct?: undefined | null | boolean
}

export const choiceButtonClassName = styles.ChoiceButton
export const choiceButtonCorrectClassName = styles.Correct
export const choiceButtonIncorrectClassName = styles.Incorrect
export const ChoiceButton = ({
  correct,
  className,
  ...props
}: ChoiceButtonProps) => {
  return (
    <button
      className={cn(cleanButton, styles.ChoiceButton, className, {
        [styles.Correct]: correct === true,
        [styles.Incorrect]: correct === false,
      })}
      {...props}
    />
  )
}
