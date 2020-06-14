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
import { ScrollContext, ScrollHandler } from '../ControllableScrollbars'
import { findNestedItem, getRefFactory, getView, toggleStatus } from './util'
import { useContainerHeight } from './useContainerHeight'

// "Padding" items on top and bottom
const extraItems = 5
// TODO: move to css
const duration = 500

export function useVirtualizedViews<TData>(
  options: VirtualizedListOptions<TData>,
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

      const views: VirtualizedView[] = [
        getView(groupIndex, itemIndex, start * itemsHeight),
      ]

      const lastGroup = getCount(data, -1) - 1
      // Last element that should be seen
      const target = window.innerHeight + extraItems * itemsHeight
      // Height that has already been taken by existing items
      let currHeight = 0
      // Index of currently processed item
      let current = start

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

            // If collapsing, initialize ref factory that produces refs that
            // will move elements after collapsing group bach to the top
            if (status[groupIndex] === ItemAnimationStatus.COLLAPSING) {
              getRef = getRefFactory(itemsHeight)
            }

            // Add items
            for (let i = 0; i < count; i++) {
              views.push({
                type: ViewType.ITEM,
                itemIndex: i,
                groupIndex,
                top: (current + i) * itemsHeight,
              })
            }

            // Current index is changed only if group is expanding, because
            // otherwise items from the top should transition to bottom
            if (status[groupIndex] === ItemAnimationStatus.EXPANDING) {
              current += count
            }

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
          getView(
            groupIndex,
            itemIndex,
            current * itemsHeight,
            getRef(current),
            status[groupIndex] in ANIMATING,
          ),
        )
        currHeight += itemsHeight
        current++
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
