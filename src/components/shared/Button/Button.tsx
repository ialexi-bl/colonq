import { cleanButton } from './CleanButton'
import { noop } from 'util/noop'
import React from 'react'
import cn from 'clsx'
import styles from './Button.module.scss'

export type ButtonProps = HTMLProps.button & {
  color?: 'primary' | 'error' | 'neutral'
}

export default function Button({
  color = 'primary',
  className,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
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
