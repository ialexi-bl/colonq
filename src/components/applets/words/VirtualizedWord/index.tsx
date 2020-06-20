import {
  VirtualizedGroupProps,
  VirtualizedItemProps,
} from 'components/shared/VirtualizedNestedList'
import { VirtualizedWordGroup } from './VirtualizedWordGroup'
import { VirtualizedWordItem } from './VirtualizedWordItem'
import { WordsData } from 'services/app-data/WordsManager.types'
import React from 'react'

export * from './VirtualizedWordGroup'
export * from './VirtualizedWordItem'

export function getVirtualizedWordViews({
  height = 48,
}: {
  height?: number
} = {}) {
  return {
    Item: (props: VirtualizedItemProps<WordsData>) => (
      <VirtualizedWordItem height={height} {...props} />
    ),
    Group: (props: VirtualizedGroupProps<WordsData>) => (
      <VirtualizedWordGroup height={height} {...props} />
    ),
  }
}
