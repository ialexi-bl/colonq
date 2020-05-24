import { useLayoutEffect } from 'react'

export const useDebouncedRippleCleanUp = (
  cleanUpFunction: () => unknown,
  rippleCount: number,
  duration: number,
) => {
  useLayoutEffect(() => {
    let bounce: any
    if (rippleCount > 0) {
      clearTimeout(bounce)

      bounce = setTimeout(() => {
        cleanUpFunction()
        clearTimeout(bounce)
      }, duration * 2)
    }

    return () => clearTimeout(bounce)
  }, [rippleCount, duration, cleanUpFunction])
}
