import './Button.scss'
import { noop } from 'util/noop'
import React from 'react'
import cn from 'clsx'

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
        'button',
        className,
        disabled
          ? 'button-disabled'
          : secondary
          ? 'button-secondary'
          : 'button-primary',
      )}
      onClick={disabled ? noop : onClick}
      {...props}
    />
  )
}
