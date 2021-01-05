import { ComponentType } from 'react'
import Adjective from '../russian/adjective'
import Adverb from '../russian/adverb'
import Noun from '../russian/noun'
import Participle from '../russian/participle'
import Verb from '../russian/verb'

const map: Record<string, ComponentType<HTMLProps.svg>> = {
  'russian/adjective': Adjective,
  'russian/adverb': Adverb,
  'russian/noun': Noun,
  'russian/participle': Participle,
  'russian/verb': Verb,
}

export default function PartsOfSpeechIcon({
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
