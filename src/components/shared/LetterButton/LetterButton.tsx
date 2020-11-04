import React from 'react'
import cn from 'clsx'
import paths from './letter-button.shape.svg'
import styles from './LetterButton.module.scss'
import useClipShape from 'hooks/use-clip-shape'

export type LetterButtonProps = Childfree<HTMLProps.button> & {
  children: string
  state?: 'correct' | 'incorrect' | null
}

const LetterButton = ({ className, state, ...props }: LetterButtonProps) => {
  useClipShape('letter-button', paths)

  return (
    <button
      className={cn(
        styles.LetterButton,
        'leading-none uppercase duration-100 py-2 px-3',
        className,
        {
          'bg-primary-700 hover:bg-primary-800 active:bg-primary-900 focus:bg-primary-900': !state,
          'bg-correct hover:bg-correct-hover active:bg-correct-active focus:bg-correct-active':
            state === 'correct',
          'bg-error hover:bg-error-hover active:bg-error-active focus:bg-error-active':
            state === 'incorrect',
        },
      )}
      {...props}
    />
  )
}
export default LetterButton
