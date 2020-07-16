import {
  ANIMATING,
  EXPANDED,
  ItemAnimationStatus,
  ViewType,
  VirtualizedListOptions,
  VirtualizedView,
} from './internal-types'
import {
  Ref,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ScrollContext, ScrollHandler } from '../ControlledScrollbars'
import { findNestedItem, getRefFactory, getView, toggleStatus } from './util'
import { noop } from 'util/noop'
import { useContainerHeight } from './use-container-height'
import styles from './VirtualizedList.module.scss'

export type VirtualizedViewsControls = {
  containerHeight: number
  views: VirtualizedView[]

  toggleFold(i: number): void
}

/**
 * Manages virtualized list's state: controls container height,
 * animation states, offsets, transforms and fold status
 * @param options
 */
export function useVirtualizedViews<TData, TAction>(
  options: VirtualizedListOptions<TData, TAction>,
): VirtualizedViewsControls {
  const { data, itemsHeight, getCount } = options
  const scrollApi = useContext(ScrollContext)

  const [status, setStatus] = useState<ItemAnimationStatus[]>(() => {
    const count = getCount(data, -1)
    return new Array(count).fill(ItemAnimationStatus.COLLAPSED)
  })
  const containerHeight = useContainerHeight(options, status)

  const [views, setViews] = useState<VirtualizedView[]>([])

  const lastUpdate = useRef(0)
  const timeouts = useRef<number[]>([])
  const currentScroll = useRef(0)
  const cancelLastRefCountdown = useRef<() => void>(noop)

  // componentDidMount
  useEffect(() => {
    const count = getCount(data, -1)
    timeouts.current = new Array(count).fill(-1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleFold = useCallback((i: number) => {
    setStatus((status) => {
      const newStatus = toggleStatus(status, i)

      clearTimeout(timeouts.current[i])
      timeouts.current[i] = window.setTimeout(() => {
        setStatus((status) => {
          return toggleStatus(status, i, true)
        })
      }, duration)

      return newStatus
    })
  }, [])

  const updateViews = useCallback(
    (scroll) => {
      // Saving current scroll state to update views when status change
      currentScroll.current = scroll

      // Prevent updating more often than once every 100ms
      const now = performance.now()
      if (now - lastUpdate.current < 100) return
      lastUpdate.current = now

      cancelLastRefCountdown.current()
      cancelLastRefCountdown.current = noop

      // First item if the list is flat
      const start = Math.max(Math.floor(scroll / itemsHeight) - extraItems, 0)

      // Pointers to last processed group and item
      let { groupIndex, itemIndex } = findNestedItem(options, status, start)
      // Pointer to currently processed item
      // let current = getItem(data, groupIndex, itemIndex)

      const views: VirtualizedView[] = [
        getView({
          groupIndex,
          itemIndex,
          top: start * itemsHeight,
          expanded: status[groupIndex] in EXPANDED,
        }),
      ]

      const lastGroup = getCount(data, -1) - 1
      // Last element that should be seen
      const target = window.innerHeight + extraItems * itemsHeight
      // Height that has already been taken by existing items
      let currHeight = 0
      // Index of currently processed item
      // +1 because first item is added directly into the array above
      let current = start + 1

      // Contains a ref factory. It is assigned a value if a collapsing
      // group is met, it then generates refs that move items after collapsing
      // group to top
      let getRef: (i: number) => undefined | Ref<HTMLElement> = () => undefined

      // Filling views
      while (currHeight < target) {
        // If processing an item
        if (itemIndex >= 0) {
          // If there are more items in current group
          if (itemIndex < getCount(data, groupIndex) - 1) {
            itemIndex++
          }
          // If there are more groups left
          else if (groupIndex < lastGroup) {
            ++groupIndex
            itemIndex = -1
          } else break
        }
        // If processing a group
        else {
          // If group is being animated
          if (status[groupIndex] in ANIMATING) {
            // Count of items that fit into screen
            const count = Math.min(
              getCount(data, groupIndex),
              Math.floor((window.innerHeight * 1.2) / itemsHeight),
            )

            const collapsing =
              status[groupIndex] === ItemAnimationStatus.COLLAPSING
            const expanding = !collapsing

            // If collapsing, initialize ref factory that produces refs that
            // will move elements after collapsing group bach to the top
            // Count is subtracted from number of element to get real
            // top value, not counting "ghost" children
            if (collapsing) {
              ;({
                factory: getRef,
                cancel: cancelLastRefCountdown.current,
              } = getRefFactory(itemsHeight, count))
            }

            // Add items
            for (let i = 0; i < count; i++) {
              views.push({
                itemIndex: i,
                type: ViewType.ITEM,
                top: (current + i) * itemsHeight,
                groupIndex,
                collapsing,
                expanding,
              })
            }
            // Account for implicitly added elements when calculating
            // top offset, but not how much window is filled
            current += count

            if (groupIndex < lastGroup) {
              ++groupIndex
              itemIndex = -1
            } else break
          }
          // If group is expanded and has items
          else if (
            status[groupIndex] in EXPANDED &&
            getCount(data, groupIndex) > 0
          ) {
            itemIndex = 0
          }
          // If there are more groups left
          else if (groupIndex < lastGroup) {
            ++groupIndex
            itemIndex = -1
          } else break
        }

        views.push(
          getView({
            groupIndex,
            itemIndex,
            expanded: status[groupIndex] in EXPANDED,
            top: current * itemsHeight,
            ref: getRef(current),
          }),
        )
        currHeight += itemsHeight
        current++
      }

      setViews(views)
    },
    [data, getCount, itemsHeight, options, status],
  )

  // Update views when state, heihgt or data change
  useEffect(() => {
    updateViews(currentScroll.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, status, itemsHeight])

  useEffect(() => {
    const onScroll: ScrollHandler = ({ detail: values }) => {
      updateViews(values.scrollTop)
    }

    scrollApi.addScrollListener(onScroll)
    return () => {
      scrollApi.removeScrollListener(onScroll)
    }
  }, [scrollApi, updateViews])

  return {
    containerHeight,
    toggleFold,
    views,
  }
}

// "Padding" items on top and bottom
const extraItems = 7
const duration = parseInt(styles.duration)
