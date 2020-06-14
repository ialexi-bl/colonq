import { CSSProperties, ComponentType, Ref } from 'react'

export type GetItemsCount<TData> = (data: TData, group: number) => number
export type VirutalizedListProps<TData> = {
  data: TData
  getCount: GetItemsCount<TData>
  itemsHeight: number
  group: ComponentType<VirtualizedGroupProps<TData>>
  item: ComponentType<VirutualizedItemProps<TData>>
}

export type VirtualizedGroupProps<TData> = {
  data: TData
  groupIndex: number
  toggleFold: (groupIndex: number) => void
  style: CSSProperties
  ref?: Ref<any>
}

export type VirutualizedItemProps<TData> = {
  data: TData
  groupIndex: number
  itemIndex: number
  style: CSSProperties
  ref?: Ref<any>
}
