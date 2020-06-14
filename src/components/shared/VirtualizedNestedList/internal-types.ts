import { VirutalizedListProps } from './types'

export type VirtualizedListOptions<TData> = VirutalizedListProps<TData>
export type VirtualizedView = {
  groupIndex: number
  itemIndex: number
  type: ViewType
  top: number
  ref?: React.Ref<HTMLElement>
}

export enum ItemAnimationStatus {
  EXPANDED,
  EXPANDING,
  COLLAPSED,
  COLLAPSING,
}
export enum ViewType {
  // ANIMATING_ITEM,
  GROUP,
  ITEM,
}

// Helper constants to quickly check state
export const EXPANDED = {
  [ItemAnimationStatus.EXPANDING]: 1,
  [ItemAnimationStatus.EXPANDED]: 1,
}
export const COLLAPSED = {
  [ItemAnimationStatus.COLLAPSED]: 1,
  [ItemAnimationStatus.COLLAPSING]: 1,
}
export const ANIMATING = {
  [ItemAnimationStatus.EXPANDING]: 1,
  [ItemAnimationStatus.COLLAPSING]: 1,
}
