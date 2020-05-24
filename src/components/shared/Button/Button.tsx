import { cleanButton } from './CleanButton'
import React from 'react'
import cn from 'clsx'
import styles from './Button.module.scss'

export type StyledButtonProps = ButtonProps & {
  color?: 'primary' | 'deny' | 'disabled' | 'neutral'
}

const prevent = (e: React.SyntheticEvent) => e.preventDefault()
export function Button({
  className,
  color = 'primary',
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
      onClick={disabled ? prevent : onClick}
      {...props}
    />
  )
}
