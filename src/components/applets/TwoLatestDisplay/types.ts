export type TwoLatestDisplayViewProps<TItem> = {
  active: boolean
  item: TItem
  next: () => unknown
}

export type TwoLatestDisplayItem<TData> = {
  id: string
  data: TData
  hiding?: boolean
  scale?: number
}
export type TwoLatestItems<TData> = {
  current: Item<TData> | null
  prev1: Item<TData> | null
  prev2: Item<TData> | null
}
export type TwoLatestDisplayProps<TData> = {
  component: React.ComponentType<TwoLatestDisplayViewProps<TData>>
  words: TwoLatestItems<TData>
  next: (hiding?: boolean) => unknown
  className?: string
}

export type Item<TData> = TwoLatestDisplayItem<TData>
