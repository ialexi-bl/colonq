export type TwoLatestDisplayViewProps<TItem> = {
  active: boolean
  item: TItem
  next: () => unknown
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
  component: React.ComponentType<TwoLatestDisplayViewProps<TData>>
  // words: TwoLatestItems<TData>
  className?: string
  next: (hiding?: boolean) => unknown
  current: TwoLatestDisplayItem<TData> | null
  previous: TwoLatestDisplayItem<TData> | null
  previous2: TwoLatestDisplayItem<TData> | null
}

export type Item<TData> = TwoLatestDisplayItem<TData>
