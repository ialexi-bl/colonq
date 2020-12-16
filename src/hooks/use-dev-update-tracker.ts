import { useEffect, useRef } from 'react'
import Config from 'config'

/**
 * Displays which variables changed since last render
 * @param name - Component name that will be shown in console
 * @param props
 */
export default function useDevUpdateTracker(props: Record<string, any>): void
export default function useDevUpdateTracker(
  name: string,
  props: Record<string, any>,
): void
export default function useDevUpdateTracker(name: any, props?: any): void {
  const previousProps = useRef<any>()

  if (!props) {
    props = name
    name = 'default'
  }

  useEffect(() => {
    console.debug("! Update tracker used, don't forget to delete in production")
  }, [])
  if (Config.IS_PROD) {
    console.error('Dev update tracker used in production')
  } else if (previousProps.current) {
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
}
