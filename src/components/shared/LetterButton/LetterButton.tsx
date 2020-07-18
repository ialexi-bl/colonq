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
    className={cn(
      'text-center leading-none rounded-sm uppercase py-0 px-1',
      className,
      {
        [styles.correct]: state === 'correct',
        [styles.incorrect]: state === 'incorrect',
      },
    )}
    {...props}
  />
)
export default LetterButton
