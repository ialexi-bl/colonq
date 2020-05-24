import { Link, LinkProps } from 'react-router-dom'
import { useRipples } from 'hooks/useRipples'
import React, { useCallback } from 'react'
import cn from 'clsx'
import styles from './RippleContainer.module.scss'

export interface RippleLinkProps extends LinkProps {
  color?: string
  duration?: number
}

/**
 * Same as ripple button except renders a link
 * @param props
 */
export const RippleLink = ({
  className,
  children,
  onClick,
  color,
  duration,
  ...props
}: RippleLinkProps) => {
  const [makeRipple, ripples] = useRipples({ color, duration })
  const click = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      makeRipple(e)
      onClick?.(e)
    },
    [makeRipple, onClick],
  )

  return (
    <Link
      className={cn(className, styles.RippleContainer)}
      onClick={click}
      {...props}
    >
      {ripples}
      {children}
    </Link>
  )
}
