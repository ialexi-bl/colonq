import {
  COLLAPSED,
  EXPANDED,
  ItemAnimationStatus,
  ViewType,
  VirtualizedListOptions,
  VirtualizedView,
} from './internal-types'
import { Ref } from 'react'

export function toggleStatus(status: ItemAnimationStatus[], i: number) {
  const newStatus = [...status]
  const s = status[i]

  if (s in EXPANDED) {
    newStatus[i] = ItemAnimationStatus.COLLAPSING
  } else if (s in COLLAPSED) {
    newStatus[i] = ItemAnimationStatus.EXPANDING
  } else {
    return status
  }

  return newStatus
}

/**
 * Finds group and item index in nested dataset that correspond
 * to the item that would have given index if dataset was flat
 * @param options - Virtualized list options
 * @param status - List of group status
 * @param index - Item index to look for
 */
export function findNestedItem<TData, TItem>(
  { data, getCount }: VirtualizedListOptions<TData, TItem>,
  status: ItemAnimationStatus[],
  index: number,
) {
  // Finding first item that
  for (let i = 0, acc = 0, l = getCount(data, -1); i < l; ++i) {
    // Whether current group is expanded or not
    const exp = status[i] in EXPANDED
    // Count of elements this group spans
    // +1 accounts for item that represents group itself
    const count = exp ? getCount(data, i) + 1 : 1

    // If items with current group are less than first visible item
    // then keep going
    if (acc + count <= index) {
      acc += count
    }
    // Otherwise save group index and find item
    // that will be displayed last
    else {
      return {
        groupIndex: i,
        // If acc is equal to start, itemIndex will be -1
        itemIndex: index - acc - 1,
      }
    }
  }
  throw new Error('handle later')
}

export const getView = (
  groupIndex: number,
  itemIndex: number,
  top: number,
  ref?: Ref<HTMLElement>,
  animating?: boolean,
): VirtualizedView => ({
  type:
    itemIndex < 0
      ? ViewType.GROUP
      : animating
      ? ViewType.ANIMATING_ITEM
      : ViewType.ITEM,
  groupIndex,
  itemIndex,
  ref,
  top,
})

export function getRefFactory(itemsHeight: number) {
  const controller = {
    items: [] as [number, HTMLElement][],
    started: false,
    addElement(i: number, e: HTMLElement) {
      this.items.push([i, e])
      if (this.started) return

      this.started = true
      this.countdown()
    },
    countdown() {
      setTimeout(() => {
        for (const [i, e] of this.items) {
          e.style.transform = `translateY(${i * itemsHeight}px)`
        }
      }, 10)
    },
  }

  return (i: number) => (e: HTMLElement | null) => {
    if (!e) return
    controller.addElement(i, e)
  }
}
