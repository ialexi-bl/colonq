import { ComponentType, Ref } from 'react'

export type GetItemsCount<TData> = (data: TData, group: number) => number
export type VirutalizedListProps<TData, TAction> = {
  itemsHeight: number
  dispatch?: (action: TAction) => void
  getCount: GetItemsCount<TData>
  group: ComponentType<VirtualizedGroupProps<TData, TAction>>
  data: TData
  item: ComponentType<VirtualizedItemProps<TData, TAction>>
}

export type VirtualizedGroupProps<TData, TAction> = {
  elementRef?: Ref<any>
  groupIndex: number
  toggleFold: (groupIndex: number) => void
  className: string
  transform: string
  expanded: boolean
  dispatch: (action: TAction) => void
  data: TData
}

export type VirtualizedItemProps<TData, TAction> = {
  elementRef?: Ref<any>
  groupIndex: number
  collapsing: boolean
  expanding: boolean
  itemIndex: number
  className: string
  transform: string
  dispatch: (action: TAction) => void
  data: TData
}
