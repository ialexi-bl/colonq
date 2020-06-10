import { Logo } from 'components/icons/Logo'
import React, { useRef, useState } from 'react'

/**
 * Logo that starts animating on hover and stops
 * when the animation is finished, regardless of when
 * the cursor leaves it
 * @param props
 */
export default ({ className }: { className?: string }) => {
  const [animating, setAnimating] = useState(false)

  // Using ref instead of state, because has to be
  // accessed from setTimeout
  const started = useRef(-1)
  const timer = useRef(-1)

  const start = () => {
    // Prevent stopping animation if mouseenter happens
    // several times in a row
    if (timer.current > 0) {
      clearTimeout(timer.current)
      timer.current = -1
    }
    // Settings started only once, because mouseenter
    // could happen in the middle of animation
    if (started.current < 0) {
      started.current = performance.now()
    }

    setAnimating(true)
  }
  const end = () => {
    // Timeout saving animation
    timer.current = window.setTimeout(() => {
      setAnimating(false)
      timer.current = started.current = -1
      // 2000 is animation duration in ms
    }, 2000 - ((performance.now() - started.current) % 2000))
  }

  console.log(animating)

  return (
    <Logo
      onMouseEnter={start}
      onMouseLeave={end}
      className={className}
      style={{
        animationPlayState: animating ? 'running' : 'paused',
      }}
    />
  )
}
