import React from 'react'
import cn from 'clsx'

export type LetterButtonProps = Childfree<HTMLProps.button> & {
  children: string
  state?: 'correct' | 'incorrect' | null
}

const LetterButton = ({ className, state, ...props }: LetterButtonProps) => (
  <button
    className={cn('leading-none uppercase rounded py-1 px-2', className, {
      'button-primary': !state,
      'bg-correct': state === 'correct',
      'bg-error': state === 'incorrect',
    })}
    {...props}
  />
)
export default LetterButton
