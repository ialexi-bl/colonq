import {
  EXPANDED,
  GetItemsCount,
  ItemAnimationStatus,
  VirtualizedListOptions,
} from './types'

export function useContainerHeight<TData, TItem>(
  { itemsHeight, getCount, data }: VirtualizedListOptions<TData, TItem>,
  status: ItemAnimationStatus[],
) {
  let count = 0
  for (let i = 0, l = status.length; i < l; i++) {
    if (status[i] === ItemAnimationStatus.COLLAPSED) {
      // No items displayed, only group
      count += 1
    } else {
      // +1 accounts for item that represents group
      count += getCount(data, i) + 1
    }
  }
  return count * itemsHeight
}
