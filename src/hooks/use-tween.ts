import { useEffect, useState } from 'react'

/**
 * Tweens from 0 to 1
 * @param enabled - true if tween should start
 * @param duration
 * @param delay
 */
export default function useTween(
  enabled: boolean,
  duration = 200,
  delay = 0,
): number {
  const [elapsed, setTime] = useState(0)

  useEffect(() => {
    if (!enabled) return

    let animationFrame: number
    let timerStop: number
    let start: number

    // Function to be executed on each animation frame
    function onFrame() {
      setTime(Date.now() - start)
      loop()
    }

    // Call onFrame() on next animation frame
    function loop() {
      animationFrame = requestAnimationFrame(onFrame)
    }

    function onStart() {
      // Set a timeout to stop things when duration time elapses
      timerStop = window.setTimeout(() => {
        cancelAnimationFrame(animationFrame)
        setTime(Date.now() - start)
      }, duration)

      // Start the loop
      start = Date.now()
      loop()
    }

    // Start after specified delay (defaults to 0)
    const timerDelay = setTimeout(onStart, delay)

    // Clean things up
    return () => {
      clearTimeout(timerStop)
      clearTimeout(timerDelay)
      cancelAnimationFrame(animationFrame)
    }
  }, [duration, delay, enabled])

  const progress = Math.min(1, elapsed / duration)
  return ease(progress)
}

const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
