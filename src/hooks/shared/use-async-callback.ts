import { useCallback, useState } from 'react'

export default function useAsyncCallback<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  deps: any[],
) {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'error' | 'success'
  >('idle')

  return {
    status,
    execute: useCallback((...args: T) => {
      setStatus('pending')
      return fn(...args)
        .then(() => {
          setStatus('success')
        })
        .catch(() => {
          setStatus('error')
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps),
  }
}
