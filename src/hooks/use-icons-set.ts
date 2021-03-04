import { ComponentType, useEffect, useState } from 'react'

export type IconComponent = ComponentType<HTMLProps.svg & { name: string }>

const cache: Record<string, IconComponent> = {}
const nullComponent = () => null

export default function useIconsSet(name: string): IconComponent {
  const [Icon, setIconProvider] = useState<IconComponent>(
    () => cache[name] || nullComponent,
  )

  useEffect(() => {
    if (!(name in cache)) {
      import(`components/icons/apps/.sets/${name}`).then((module) => {
        setIconProvider(() => module.default)
      })
    }
  }, [name])

  return Icon
}
