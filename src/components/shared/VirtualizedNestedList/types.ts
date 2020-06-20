import { CSSProperties, ComponentType, Ref } from 'react'

export type GetItemsCount<TData> = (data: TData, group: number) => number
export type VirutalizedListProps<TData> = {
  data: TData
  getCount: GetItemsCount<TData>
  itemsHeight: number
  group: ComponentType<VirtualizedGroupProps<TData>>
  item: ComponentType<VirtualizedItemProps<TData>>
}

export type VirtualizedGroupProps<TData> = {
  elementRef?: Ref<any>
  groupIndex: number
  toggleFold: (groupIndex: number) => void
  className: string
  transform: string
  expanded: boolean
  data: TData
}

export type VirtualizedItemProps<TData> = {
  elementRef?: Ref<any>
  groupIndex: number
  collapsing: boolean
  expanding: boolean
  itemIndex: number
  className: string
  transform: string
  data: TData
}
