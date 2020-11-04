import { useEffect, useRef } from 'react'

export default function useDevUpdateTracker(name: string, props: any) {
  const previousProps = useRef<any>()

  useEffect(() => {
    console.warn("Update tracker used, don't forget to delete in production")
    console.groupCollapsed('Trace')
    console.trace()
    console.groupEnd()
  }, [])
  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props })
      const changesObj: any = {}

      allKeys.forEach((key) => {
        if (previousProps.current[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          }
        }
      })

      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj)
      }
    }

    previousProps.current = props
  })
}
