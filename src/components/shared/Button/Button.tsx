import { Link, LinkProps } from 'react-router-dom'
import { noop } from 'util/noop'
import React from 'react'
import cn from 'clsx'
import paths from 'shapes/button.shape.svg'
import styles from './Button.module.scss'
import useClipShape from 'hooks/shared/use-svg-texture'

type CommonProps = {
  secondary?: boolean
  variant?: 1 | 2 | 3
}
export type ButtonProps = HTMLProps.button & CommonProps
export type LinkButtonProps = LinkProps & CommonProps

export default function Button({
  secondary,
  className,
  disabled,
  onClick,
  variant = 1,
  ...props
}: ButtonProps) {
  useClipShape('button', paths)

  return (
    <button
      className={getClassName(className, variant, secondary, disabled)}
      onClick={disabled ? noop : onClick}
      {...props}
    />
  )
}

export function LinkButton({
  secondary,
  className,
  variant = 1,
  ...props
}: LinkButtonProps) {
  useClipShape('button', paths)

  return (
    <Link
      className={getClassName(className, variant, secondary, false, true)}
      {...props}
    />
  )
}

const getClassName = (
  className?: string,
  variant?: 1 | 2 | 3,
  secondary?: boolean,
  disabled?: boolean,
  link?: boolean,
) => {
  return cn(
    buttonCn,
    className,
    styles[`variant-${variant}`],
    link && 'text-center',
    disabled ? disabledCn : secondary ? secondaryCn : primaryCn,
  )
}
const buttonCn = 'py-4 px-6 duration-200 bg-cover bg-center bg-no-repeat'
const primaryCn = `bg-primary-700 ${styles.primary}`
const secondaryCn = `bg-secondary-200 ${styles.secondary}`
const disabledCn = `bg-disabled`
