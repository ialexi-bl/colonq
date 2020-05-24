import { Input } from 'components/shared/Input'
import { WordsListEditor, WordsListEditorProps } from './WordsListEditor'
import { WordsSearch } from './WordsSearch'
import React, { useRef, useState } from 'react'
import styles from './WordsListEditor.module.scss'

export function WordsList({ data, dispatch }: WordsListEditorProps) {
  const [search, setSearch] = useState('')
  const persist = useRef<any>({})

  return (
    <div>
      <Input
        value={search}
        onChange={setSearch}
        placeholder={'Поиск'}
        className={styles.Search}
      />
      <WordsSearch
        value={search}
        data={data}
        hidden={search === ''}
        persist={persist}
        dispatch={dispatch}
      />
      <WordsListEditor data={data} hidden={search !== ''} dispatch={dispatch} />
    </div>
  )
}
