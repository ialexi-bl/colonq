import {
  VirtualizedGroupProps,
  VirtualizedItemProps,
} from 'components/shared/VirtualizedList'
import {
  WordsData,
  WordsEditAction,
} from 'services/applets/WordsAppletManager/types'
import React from 'react'
import VirtualizedWordGroup from './VirtualizedWordGroup'
import VirtualizedWordItem from './VirtualizedWordItem'

export { default as VirtualizedWordGroup } from './VirtualizedWordGroup'
export { default as VirtualizedWordItem } from './VirtualizedWordItem'
export * from './VirtualizedWordGroup'
export * from './VirtualizedWordItem'

export default function getVirtualizedWordViews({
  height = 48,
}: {
  height?: number
} = {}) {
  return {
    Item: (props: VirtualizedItemProps<WordsData, WordsEditAction>) => (
      <VirtualizedWordItem height={height} {...props} />
    ),
    Group: (props: VirtualizedGroupProps<WordsData, WordsEditAction>) => (
      <VirtualizedWordGroup height={height} {...props} />
    ),
  }
}
