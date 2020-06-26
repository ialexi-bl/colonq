import { ViewType, VirtualizedListOptions } from './internal-types'
import { useVirtualizedViews } from './useVIrtualizedViews'
import React from 'react'
import styles from './VirtualizedNestedList.module.scss'

/**
 * Virtualized list that supports nested elements.
 * All styles must be provided by user of the virtualized list
 * User must also provide animation for items that happen
 * when a group is expanded, as well as styles when item disappears and
 * transition for `transform` property that moves items
 * @param props
 */
export default function VirtualizedList<TData>(
  options: VirtualizedListOptions<TData>,
) {
  const { data, group: Group, item: Item } = options
  const { containerHeight, toggleFold, views } = useVirtualizedViews(options)

  return (
    <ul className={styles.Container} style={{ height: containerHeight }}>
      {views.map(
        ({
          expanding,
          collapsing,
          groupIndex,
          itemIndex,
          expanded,
          type,
          top,
          ref,
        }) => {
          const transform = `translateY(${top}px)`
          if (type === ViewType.GROUP) {
            return (
              <Group
                elementRef={ref}
                toggleFold={toggleFold}
                groupIndex={groupIndex}
                className={styles.View}
                expanded={expanded!}
                transform={transform}
                data={data}
                key={`${groupIndex}`}
              />
            )
          }

          return (
            <Item
              elementRef={ref}
              groupIndex={groupIndex}
              collapsing={collapsing || false}
              expanding={expanding || false}
              className={styles.View}
              itemIndex={itemIndex}
              transform={transform}
              data={data}
              key={`${groupIndex}-${itemIndex}`}
            />
          )
        },
      )}
    </ul>
  )
}
