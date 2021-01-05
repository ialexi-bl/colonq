import { ComponentType } from 'react'
import Sin from '../math/sin'
import Cos from '../math/cos'
import Tan from '../math/tan'
import Cot from '../math/cot'
import Sec from '../math/sec'
import Csc from '../math/csc'

const map: Record<string, ComponentType<HTMLProps.svg>> = {
  'math/sin': Sin,
  'math/cos': Cos,
  'math/tan': Tan,
  'math/cot': Cot,
  'math/sec': Sec,
  'math/csc': Csc,
}

export default function TrigIcon({
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
