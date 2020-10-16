import {
  VirtualizedGroupProps,
  VirtualizedItemProps,
} from 'components/shared/VirtualizedList'
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
    Item: (props: VirtualizedItemProps<any, any>) => (
      <VirtualizedWordItem height={height} {...props} />
    ),
    Group: (props: VirtualizedGroupProps<any, any>) => (
      <VirtualizedWordGroup height={height} {...props} />
    ),
  }
}
