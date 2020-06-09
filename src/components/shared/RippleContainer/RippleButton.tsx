import { CleanButton } from '../Button'
import { useRipples } from 'hooks/useRipples'
import React, { useCallback } from 'react'
import cn from 'clsx'
import styles from './RippleContainer.module.scss'

export interface RippleButtonProps extends HTMLProps.button {
  color?: string
  duration?: number
}

/**
 * Button w/o native browser styles and with ripples
 * @param param0
 */
export const RippleButton = ({
  className,
  children,
  onClick,
  color,
  duration,
  ...props
}: RippleButtonProps) => {
  const [makeRipple, ripples] = useRipples({ color, duration })
  const click = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      makeRipple(e)
      onClick?.(e)
    },
    [makeRipple, onClick],
  )

  return (
    <CleanButton
      className={cn(className, styles.RippleContainer)}
      onClick={click}
      {...props}
    >
      {ripples}
      {children}
    </CleanButton>
  )
}
