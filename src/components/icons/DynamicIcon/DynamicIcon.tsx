import Config from 'config'
import React, { Suspense, lazy } from 'react'

const cache: Record<string, React.ComponentType<HTMLProps.svg>> = {}
export type DynamicIconProps = HTMLProps.svg & {
  icon: string
}

export default function DynamicIcon({ icon, ...props }: DynamicIconProps) {
  const Component = (cache[icon] ||= lazy(() => importIcon(icon)))

  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  )
}

export function preloadIcons(icons: string[]) {
  const promises: Promise<void>[] = []
  icons.forEach((icon) => {
    if (!(icon in cache)) {
      const promise = importIcon(icon)
      cache[icon] = lazy(() => promise)
      promises.push(promise.then(() => {}))
    }
  })
  return Promise.all(promises)
}
function importIcon(icon: string) {
  return import(`components/icons/dynamic/${icon}/index`).catch((e) => {
    if (Config.IS_DEV) console.log(e)
    return { default: () => null }
  })
}
