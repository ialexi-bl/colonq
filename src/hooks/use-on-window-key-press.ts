import { useEffect } from 'react'

export default function useOnWindowKeyPress(
  keyCode:
    | string
    | {
        ctrl?: boolean
        alt?: boolean
        meta?: boolean
        shift?: boolean
        code: string
      },
  callback: () => void,
): void {
  if (typeof keyCode === 'string') keyCode = { code: keyCode }
  const {
    alt = false,
    meta = false,
    ctrl = false,
    shift = false,
    code,
  } = keyCode

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        e.code === code &&
        e.altKey === alt &&
        e.metaKey === meta &&
        e.ctrlKey === ctrl &&
        e.shiftKey === shift
      ) {
        callback()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [code, callback, alt, meta, ctrl, shift])
}
