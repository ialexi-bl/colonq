import { ViewType, VirtualizedListOptions } from './internal-types'
import { useVirtualizedViews } from './useVIrtualizedViews'
import React from 'react'
import styles from './VirtualizedNestedList.module.scss'

export function VirtualizedList<TData>(options: VirtualizedListOptions<TData>) {
  const { data, group: Group, item: Item } = options
  const { containerHeight, toggleFold, views, start } = useVirtualizedViews(
    options,
  )

  return (
    <ul style={{ height: containerHeight }}>
      {views.map(({ groupIndex, itemIndex, type, top, ref }) => {
        const style = { transform: `translateY(${top}px)` }
        switch (type) {
          case ViewType.GROUP: {
            return (
              <Group
                key={`${groupIndex}`}
                data={data}
                toggleFold={toggleFold}
                groupIndex={groupIndex}
                style={style}
                ref={ref}
              />
            )
          }
          case ViewType.ITEM: {
            return (
              <Item
                key={`${groupIndex}-${itemIndex}`}
                data={data}
                groupIndex={groupIndex}
                itemIndex={itemIndex}
                style={style}
              />
            )
          }
        }
      })}
    </ul>
  )
}
