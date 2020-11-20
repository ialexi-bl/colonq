import { useRef } from 'react'

export default function useOnce<TArgs extends any[]>(
  fn: (...args: TArgs) => unknown,
) {
  const run = useRef(false)

  return (...args: TArgs): void => {
    if (!run.current) {
      run.current = true
      fn(...args)
    }
  }
}
