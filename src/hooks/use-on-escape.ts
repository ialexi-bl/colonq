import { useCallback, useEffect } from 'react'

export function useOnEscape(cb: () => unknown, deps: any[] = []) {
  const fn = useCallback(cb, deps)

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        fn()
      }
    }

    window.addEventListener('keydown', keyDown)
    return () => {
      window.removeEventListener('keydown', keyDown)
    }
  }, [fn])
}
