import { useCallback, useEffect, useState } from 'react'

type AsyncResult<T, E> = {
  execute: () => Promise<void>
} & (
  | {
      status: 'idle' | 'pending'
      value: null
      error: null
    }
  | {
      status: 'success'
      value: T
      error: null
    }
  | {
      status: 'error'
      value: null
      error: E
    }
)

export default function useAsync<T, E = string>(
  fn: () => Promise<T>,
  deps: any[],
) {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle')
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  const execute = useCallback(() => {
    setStatus('pending')
    setValue(null)
    setError(null)

    return fn()
      .then((response: any) => {
        setValue(response)
        setStatus('success')
      })
      .catch((error: any) => {
        setError(error)
        setStatus('error')
      })
  }, deps)

  useEffect(() => {
    execute()
  }, [execute])

  return { execute, status, value, error } as AsyncResult<T, E>
}
