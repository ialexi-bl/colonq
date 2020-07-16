import Button from '../Button'
import React from 'react'
import cn from 'clsx'
import styles from './LetterButton.module.scss'

export type LetterButtonProps = Childfree<HTMLProps.button> & {
  children: string
  state?: 'correct' | 'incorrect' | null
}

const LetterButton = ({ className, state, ...props }: LetterButtonProps) => (
  <Button
    className={cn(className, styles.LetterButton, {
      [styles.correct]: state === 'correct',
      [styles.incorrect]: state === 'incorrect',
    })}
    {...props}
  />
)
export default LetterButton
