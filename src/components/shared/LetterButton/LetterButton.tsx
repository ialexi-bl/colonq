import React, { ReactNode } from 'react'
import cn from 'clsx'
import paths from './letter-button.shape.svg'
import styles from './LetterButton.module.scss'
import useClipShape from 'hooks/use-clip-shape'

export type LetterButtonProps = Childfree<HTMLProps.button> & {
  children?: ReactNode
  state?: 'correct' | 'incorrect' | 'invisible' | null
}

const LetterButton = ({
  className,
  state,
  disabled,
  ...props
}: LetterButtonProps) => {
  useClipShape('letter-button', paths)

  return (
    <button
      disabled={disabled}
      className={cn(
        styles.LetterButton,
        'leading-none uppercase duration-100 py-2 px-3',
        className,
        {
          'bg-disabled-1000': disabled,
          'bg-primary-700 hover:bg-primary-800 active:bg-primary-900 focus:bg-primary-900':
            !state && !disabled,
          'bg-correct hover:bg-correct-hover active:bg-correct-active focus:bg-correct-active':
            !disabled && state === 'correct',
          'bg-error hover:bg-error-hover active:bg-error-active focus:bg-error-active':
            !disabled && state === 'incorrect',
        },
      )}
      {...props}
    />
  )
}
export default LetterButton
