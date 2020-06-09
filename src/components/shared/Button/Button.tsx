import { cleanButton } from './CleanButton'
import React from 'react'
import cn from 'clsx'
import styles from './Button.module.scss'

export type StyledButtonProps = ButtonProps & {
  color?: 'primary' | 'incorrect' | 'error' | 'neutral'
}

const noop = () => {}
export function Button({
  color = 'primary',
  className,
  disabled,
  onClick,
  ...props
}: StyledButtonProps) {
  return (
    <button
      className={cn(
        className,
        cleanButton,
        styles.Button,
        disabled ? styles.disabled : styles[color],
      )}
      onClick={disabled ? noop : onClick}
      {...props}
    />
  )
}
