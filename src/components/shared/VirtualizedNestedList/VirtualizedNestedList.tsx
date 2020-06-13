import { VirtualizedListOptions } from './types'
import { useVirtualizedViews } from './useVIrtualizedViews'
import React from 'react'
import styles from './VirtualizedNestedList.module.scss'

export function VirtualizedList<TData, TDispatch>(
  options: VirtualizedListOptions<TData, TDispatch>,
) {
  const views = useVirtualizedViews(options)

  return <div></div>
}
