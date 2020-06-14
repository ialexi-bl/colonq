import { ControllableScrolbars } from '../ControllableScrollbars'
import { VirtualizedGroupProps, VirutualizedItemProps } from './types'
import { VirtualizedList } from './VirtualizedNestedList'
import React, { forwardRef } from 'react'

const data = [...new Array(20)].map((_, i) => {
  return {
    label: i,
    items: [...new Array(20)].map((_, i) => ({ label: i })),
  }
})
type Data = typeof data

const getCount = (data: Data, groupIndex: number) =>
  groupIndex < 0 ? data.length : data[groupIndex].items.length

export default () => {
  return (
    <ControllableScrolbars>
      <VirtualizedList
        getCount={getCount}
        itemsHeight={20}
        group={Group}
        item={Item}
        data={data}
      />
    </ControllableScrolbars>
  )
}

const styles = { height: 25, marginBottom: 5 }

const Group = forwardRef<HTMLDivElement, VirtualizedGroupProps<Data>>(
  function Group({ data, groupIndex, style, toggleFold }, ref) {
    const group = data[groupIndex]

    return (
      <div style={{ ...styles, ...style }} ref={ref}>
        {group.label}
      </div>
    )
  },
)

const Item = forwardRef<HTMLDivElement, VirutualizedItemProps<Data>>(
  function Item({ data, groupIndex, style, itemIndex }, ref) {
    const item = data[groupIndex].items[itemIndex]

    return (
      <div style={{ ...styles, ...style }} ref={ref}>
        {item.label}
      </div>
    )
  },
)
