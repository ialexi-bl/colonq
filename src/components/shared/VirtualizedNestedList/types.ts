export type VirtualizedListOptions<TData, TItem> = {
  data: TData
  getItem: GetItem<TData, TItem>
  getCount: GetItemsCount<TData>
  itemsHeight: number
}

export type GetItemsCount<TData> = (data: TData, group: number) => number
export type GetItem<TData, TItem> = (
  data: TData,
  group: number,
  item: number,
) => TItem

export type VirtualizedView = {
  type: ViewType
  itemIndex: number
  groupIndex: number
}

export enum ItemAnimationStatus {
  FOLDING,
  EXPANDED,
  UNFOLDING,
  COLLAPSED,
}
export enum ViewType {
  ANIMATING_ITEM,
  GROUP,
  ITEM,
}

// Helper constants to quickly check state
export const EXPANDED = {
  [ItemAnimationStatus.UNFOLDING]: 1,
  [ItemAnimationStatus.EXPANDED]: 1,
}
export const COLLAPSED = {
  [ItemAnimationStatus.COLLAPSED]: 1,
  [ItemAnimationStatus.FOLDING]: 1,
}
export const ANIMATING = {
  [ItemAnimationStatus.UNFOLDING]: 1,
  [ItemAnimationStatus.FOLDING]: 1,
}
