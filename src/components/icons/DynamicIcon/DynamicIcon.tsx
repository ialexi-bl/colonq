import React, { Suspense, lazy } from 'react'

const cache: Record<string, React.ComponentType<HTMLProps.svg>> = {}
export type DynamicIconProps = HTMLProps.svg & {
  icon: string
}

export default function DynamicIcon({ icon, ...props }: DynamicIconProps) {
  const Component = (cache[icon] ||= lazy(
    () => import(`components/icons/dynamic/${icon}/index`),
  ))

  return (
    <Suspense fallback={<svg {...props} />}>
      <Component {...props} />
    </Suspense>
  )
}
