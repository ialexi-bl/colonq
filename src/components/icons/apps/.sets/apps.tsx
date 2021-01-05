import { ComponentType } from 'react'
import Verbs from '../russian/verbs'
import Paronyms from '../russian/paronyms'
import Suffixes from '../russian/suffixes'
import Prefixes from '../russian/prefixes'
import Accents from '../russian/accents'
import Trigonometry from '../math/trigonometry'

const map: Record<string, ComponentType<HTMLProps.svg>> = {
  'russian/verbs': Verbs,
  'russian/paronyms': Paronyms,
  'russian/suffixes': Suffixes,
  'russian/prefixes': Prefixes,
  'russian/accents': Accents,
  'math/trigonometry': Trigonometry,
}

export default function AppIcon({
  name,
  ...props
}: HTMLProps.svg & { name: string }) {
  if (name in map) {
    const Cmp = map[name]
    return <Cmp {...props} />
  } else {
    return null
  }
}
