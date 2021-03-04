import { notifyInfo } from 'store/view'
import { useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'

/**
 * When `modified` is true, schedules a timeout that will call `save` function to save data. Handles page unloading
 * `modified` should be falsy to indicate that no changes need to be saved
 * @param modified - True or false for whether there is something to save
 * @param value - Value that changes and triggers save
 * @param save
 */
export default function useSave(
  modified: boolean,
  value: unknown,
  save: () => unknown | Promise<unknown>,
): void {
  const dispatch = useDispatch()
  const temp = useRef({ timer: null as null | number, force: () => {} })

  useEffect(() => {
    if (!modified) return

    async function func() {
      if (!modified) return

      await save()
      temp.current = { timer: null, force: () => {} }
    }
    function unload(e: BeforeUnloadEvent) {
      dispatch(notifyInfo('Сохранение....'))
      func()
        .then(() => {
          dispatch(notifyInfo('Настройки сохранены, можешь уходить'))
        })
        .catch(() => {
          dispatch(notifyInfo('Не удалось сохранить настройки'))
        })
      const message =
        'Стой, настройки не успели сохраниться! Точно хочешь выйти?'
      e.preventDefault()
      e.returnValue = message
      return message
    }

    temp.current = { force: func, timer: window.setTimeout(func, 500) }
    window.addEventListener('beforeunload', unload)

    return () => {
      clearTimeout(temp.current.timer!)
      window.removeEventListener('beforeunload', unload)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, value, modified])

  // Force save when leaving page
  useEffect(() => {
    return () => {
      if (temp.current.timer === null) return
      clearTimeout(temp.current.timer)
      temp.current.force()
    }
  }, [])
}
