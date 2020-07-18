import { noop } from 'util/noop'
import React from 'react'
import cn from 'clsx'
import styles from './Button.module.scss'

export type ButtonProps = HTMLProps.button & {
  secondary?: boolean
}

export default function Button({
  secondary,
  className,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'transition-color transition-200',
        className,
        styles.Button,
        disabled
          ? styles.disabled
          : secondary
          ? styles.secondary
          : styles.primary,
      )}
      onClick={disabled ? noop : onClick}
      {...props}
    />
  )
}
