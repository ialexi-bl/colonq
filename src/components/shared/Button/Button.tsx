import { noop } from 'util/noop'
import React from 'react'
import cn from 'clsx'
import styles from './Button.module.scss'
import useClipShape from 'hooks/shared/use-svg-texture'

export type ButtonProps = HTMLProps.button & {
  secondary?: boolean
  variant?: 1 | 2 | 3
}

export default function Button({
  secondary,
  className,
  disabled,
  onClick,
  variant = 1,
  ...props
}: ButtonProps) {
  useClipShape('button')

  return (
    <button
      className={cn(
        buttonCn,
        className,
        styles[`variant-${variant}`],
        disabled ? disabledCn : secondary ? secondaryCn : primaryCn,
      )}
      onClick={disabled ? noop : onClick}
      {...props}
    />
  )
}

const buttonCn = 'p-2 duration-200 bg-cover bg-center bg-no-repeat'
const primaryCn = `bg-primary-700 ${styles.primary}`
const secondaryCn = `bg-secondary-200 ${styles.secondary}`
const disabledCn = `bg-disabled`
