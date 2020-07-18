import { ItemAnimationStatus, VirtualizedListOptions } from './internal-types'

export function useContainerHeight<TData, TAction>(
  { itemsHeight, getCount, data }: VirtualizedListOptions<TData, TAction>,
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