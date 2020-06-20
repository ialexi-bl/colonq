/* eslint-disable react-hooks/rules-of-hooks */
import { ControllableScrolbars } from 'components/shared/ControllableScrollbars'
import { VirtualizedList } from 'components/shared/VirtualizedNestedList'
import { VirtualizedWordGroup } from './VirtualizedWordGroup'
import { VirtualizedWordItem } from './VirtualizedWordItem'
import { WordsData } from 'services/app-data/WordsManager.types'
import { getVirtualizedWordViews } from '.'
import { useValue } from 'react-cosmos/fixture'
import React from 'react'

const data: WordsData = [...new Array(20)].map((_, i) => ({
  id: i,
  label: `Group #${i + 1}`,
  enabled: true,
  words: [...new Array(20)].map((_, i) => ({
    id: i,
    label: `Word #${i + 1}`,
    enabled: true,
    unchanged: true,
    groupIndex: 0,
  })),
}))
const getCount = (data: WordsData, groupIndex: number) =>
  groupIndex < 0 ? data.length : data[groupIndex].words.length

export default {
  Item: () => {
    const [height] = useValue('height', { defaultValue: 48 })

    return (
      <div style={{ padding: '1rem' }}>
        <VirtualizedWordItem
          collapsing={false}
          expanding={false}
          groupIndex={0}
          transform={''}
          className={''}
          itemIndex={0}
          height={height}
          data={data}
        />
      </div>
    )
  },
  Group: () => {
    const [height] = useValue('height', { defaultValue: 48 })

    return (
      <div style={{ padding: '1rem' }}>
        <VirtualizedWordGroup
          groupIndex={0}
          toggleFold={() => {}}
          transform={''}
          className={''}
          expanded={false}
          height={height}
          data={data}
        />
      </div>
    )
  },
  'Virtualized list': () => {
    const [height] = useValue('height', { defaultValue: 48 })
    const [gap] = useValue('gap', { defaultValue: 10 })

    const { Item, Group } = getVirtualizedWordViews({ height })

    return (
      <ControllableScrolbars>
        <div style={{ width: '100%', height: '100%', padding: '1rem' }}>
          <VirtualizedList
            itemsHeight={height + gap}
            getCount={getCount}
            group={Group}
            item={Item}
            data={data}
          />
        </div>
      </ControllableScrolbars>
    )
  },
}
