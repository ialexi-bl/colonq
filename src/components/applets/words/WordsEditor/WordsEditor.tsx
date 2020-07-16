import { useEditAppData } from 'hooks/app-data'
import Loading from 'components/shared/Loading'
import React, { useMemo } from 'react'
import VirtualizedList, {
  GetItemsCount,
} from 'components/shared/VirtualizedList'
import WordsAppletManager, {
  WordsData,
} from 'services/applets/WordsAppletManager'
import getVirtualizedWordViews from '../VirtualizedWord'

export type WordsEditorProps = {
  manager: WordsAppletManager
  height?: number
}

export default function WordsEditor({
  manager,
  height = 53,
}: WordsEditorProps) {
  const { Item, Group } = useMemo(() => getVirtualizedWordViews({ height }), [
    height,
  ])
  const { data, loading, dispatch } = useEditAppData(manager)

  if (loading) {
    return <Loading />
  }
  console.log(data)
  // TODO: make normal error message
  if (!data) {
    return <div>Не удалось загрузить слова :(</div>
  }

  return (
    <VirtualizedList
      itemsHeight={height}
      dispatch={dispatch}
      getCount={getCount}
      group={Group}
      item={Item}
      data={data}
    />
  )
}

const getCount: GetItemsCount<WordsData> = (data, i) =>
  i < 0 ? data.length : data[i].words.length
