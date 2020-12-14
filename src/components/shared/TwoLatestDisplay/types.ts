import { ReactNode } from 'react'

export type TwoLatestDisplayViewProps<TItem> = {
  firstItem: boolean
  active: boolean
  item: TItem
}

export type TwoLatestDisplayItem<TData> = {
  id: string
  data: TData
  hiding?: boolean
}
export type TwoLatestItems<TData> = {
  current: Item<TData> | null
  prev1: Item<TData> | null
  prev2: Item<TData> | null
}
export type TwoLatestDisplayProps<TData> = {
  render: (props: TwoLatestDisplayViewProps<TData>) => ReactNode
  current: TwoLatestDisplayItem<TData> | null
  previous: TwoLatestDisplayItem<TData> | null
  previous2: TwoLatestDisplayItem<TData> | null
  className?: string
}

export type Item<TData> = TwoLatestDisplayItem<TData>
