export type TwoLatestDisplayViewProps<TItem, TNext extends Function> = {
  active: boolean
  item: TItem
  next: TNext
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
export type TwoLatestDisplayProps<TData, TNext extends Function> = {
  component: React.ComponentType<TwoLatestDisplayViewProps<TData, TNext>>
  next: TNext
  current: TwoLatestDisplayItem<TData> | null
  previous: TwoLatestDisplayItem<TData> | null
  previous2: TwoLatestDisplayItem<TData> | null
  className?: string
}

export type Item<TData> = TwoLatestDisplayItem<TData>
