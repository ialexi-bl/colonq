import { Logo } from 'components/icons/Logo'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import cn from 'clsx'
import styles from './InteractiveLogo.module.scss'

/**
 * Logo that starts animating on hover and stops
 * when the animation is finished, regardless of when
 * the cursor leaves it
 * @param props
 */
export default ({
  className,
  forceAnimation,
}: {
  className?: string
  forceAnimation?: boolean
}) => {
  const ref = useRef<SVGSVGElement>(null)
  const [animating, setAnimating] = useState(false)
  const animation = useMemo(() => {
    let started = -1
    let entered = false
    const start = () => {
      entered = true
      if (started < 0) {
        started = performance.now()
        setAnimating(true)
      }
    }
    const end = () => {
      entered = false
      if (started < 0) return

      const v = started
      setTimeout(() => {
        if (!entered && v === started) {
          setAnimating(false)
          started = -1
        }
        // 1900 is time, chosen empirically to make
        // the animation stop at the correct type
      }, 1900 - ((performance.now() - started) % 2000))
    }
    return { start, end }
  }, [])

  useEffect(() => {
    animation[forceAnimation ? 'start' : 'end']()
  }, [animation, forceAnimation])

  useEffect(() => {
    const el = ref.current
    el?.addEventListener('mouseenter', animation.start)
    el?.addEventListener('mouseleave', animation.end)
    return () => {
      el?.removeEventListener('mouseenter', animation.start)
      el?.removeEventListener('mousleave', animation.end)
    }
  }, [animation.end, animation.start])

  return (
    <Logo
      ref={ref}
      className={cn(className, { [styles.noAnimation]: !animating })}
    />
  )
}
