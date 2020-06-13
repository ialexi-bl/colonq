import {
  ANIMATING,
  COLLAPSED,
  EXPANDED,
  ItemAnimationStatus,
  ViewType,
  VirtualizedListOptions,
  VirtualizedView,
} from './types'
import { ScrollContext, ScrollHandler } from '../ControllableScrollbars'
import { findNestedItem, getView, toggleStatus } from './util'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useContainerHeight } from './useContainerHeight'

// "Padding" items on top and bottom
const extraItems = 5
// TODO: move to css
const duration = 500

export function useVirtualizedViews<TData, TItem>(
  options: VirtualizedListOptions<TData, TItem>,
) {
  const { data, getCount, itemsHeight } = options
  const scrollApi = useContext(ScrollContext)

  const [status, setStatus] = useState<ItemAnimationStatus[]>(() => {
    const count = getCount(data, -1)
    return new Array(count).fill(ItemAnimationStatus.COLLAPSED)
  })
  const containerHeight = useContainerHeight(options, status)

  const [start, setStart] = useState(0)
  const [views, setViews] = useState<VirtualizedView[]>([])

  const lastUpdate = useRef(0)
  const timeouts = useRef<number[]>([])

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
          return toggleStatus(status, i)
        })
      }, duration)

      return newStatus
    })
  }, [])

  const updateViews = useCallback(
    (scroll) => {
      // Prevent updating more often than once every 100ms
      const now = performance.now()
      if (now - lastUpdate.current < 100) return
      lastUpdate.current = now

      // First item if the list is flat
      const start = Math.max(Math.floor(scroll / itemsHeight) - extraItems, 0)

      // Pointers to last processed group and item
      let { groupIndex, itemIndex } = findNestedItem(options, status, start)
      // Pointer to currently processed item
      // let current = getItem(data, groupIndex, itemIndex)

      const views: VirtualizedView[] = [getView(groupIndex, itemIndex)]

      // Last element that should be seen
      const target = window.innerHeight + extraItems * itemsHeight
      // Height that has already been taken by existing items
      let currHeight = 0

      const lastGroup = getCount(data, -1) - 1
      while (currHeight < target) {
        // If there are more items left in current group
        if (itemIndex >= 0 && itemIndex < getCount(data, groupIndex) - 1) {
          itemIndex++
        }
        // If processing a group that is expanded and has words
        else if (
          itemIndex < 0 &&
          status[groupIndex] in EXPANDED &&
          getCount(data, groupIndex) > 0
        ) {
          itemIndex = 0
        }
        // If there are more groups left
        else if (groupIndex < lastGroup) {
          ++groupIndex
          itemIndex = -1
        }
        // If no more groups are left
        else break

        views.push(
          getView(groupIndex, itemIndex, status[groupIndex] in ANIMATING),
        )
        currHeight += itemsHeight
      }

      setStart(start)
      setViews(views)
    },
    [data, getCount, itemsHeight, options, status],
  )

  // TODO: this should probably be called with last value of scrollTop, don't remember why
  // useEffect(() => {
  // updateViews(0)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data])

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
    start,
  }
}
