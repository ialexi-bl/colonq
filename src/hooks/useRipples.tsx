import { Ripple } from 'components/shared/RippleContainer/Ripple'
import { useDebouncedRippleCleanUp } from './useDebouncedRippleCleanUp'
import React, { useCallback, useState } from 'react'

export type IRipple = {
  x: number
  y: number
  size: number
  background: string
  duration: number
}
export type RippleOptions = {
  duration?: number
  maxSize?: number
  color?: string
}

// const noop = () => {}

export const useRipples = ({
  duration = 850,
  color = 'rgba(0,0,0,.17)',
  maxSize = Infinity,
}: RippleOptions = {}) => {
  const [ripples, setRipples] = useState<IRipple[]>([])
  const clear = useCallback(() => setRipples([]), [])
  const makeRipple = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rippleContainer = e.currentTarget.getBoundingClientRect()
      const size = Math.min(
        Math.max(rippleContainer.width, rippleContainer.height),
        maxSize,
      )

      const x = e.pageX - rippleContainer.x - size / 2
      const y = e.pageY - rippleContainer.y - size / 2
      const newRipple = {
        x,
        y,
        size,
        duration,
        background: color,
      }

      setRipples((ripples) => [...ripples, newRipple])
    },
    [color, duration, maxSize],
  )
  useDebouncedRippleCleanUp(clear, ripples.length, duration)

  // if (!IS_TOUCH_DEVICE) return [noop, null, noop]

  return [
    makeRipple,
    ripples.map((ripple, i) => <Ripple key={i} {...ripple} />),
    clear,
  ] as const
}
