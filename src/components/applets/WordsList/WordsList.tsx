import { Input } from 'components/form/Input'
import { WordsListEditor, WordsListEditorProps } from './WordsListEditor'
import { WordsSearch } from './WordsSearch'
import React, { useRef, useState } from 'react'
import styles from './WordsListEditor.module.scss'

export function WordsList({
  sets: data,
  dispatch,
  getLabel,
}: WordsListEditorProps) {
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
        sets={data}
        getLabel={getLabel}
        hidden={search === ''}
        persist={persist}
        dispatch={dispatch}
      />
      <WordsListEditor
        sets={data}
        getLabel={getLabel}
        hidden={search !== ''}
        dispatch={dispatch}
      />
    </div>
  )
}
