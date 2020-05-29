import {
  Word,
  WordSets,
  WordsAppDataDispatch,
} from 'services/app-data/WordsManager.types'
import { WordEditor } from './WordEditor'
import Fuse from 'fuse.js'
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import flatMap from 'lodash/flatMap'

export type SearchWord = {
  label: string
  index: number
  setIndex: number
}
export type WordsSearchProps = {
  sets: WordSets
  value: string
  hidden?: boolean
  persist: React.RefObject<any>
  dispatch: WordsAppDataDispatch
  getLabel: (word: Word) => ReactNode
}

export function WordsSearch({
  sets,
  value,
  hidden,
  persist,
  dispatch,
  getLabel,
}: WordsSearchProps) {
  const fuse = useMemo<Fuse<SearchWord, any>>(() => {
    // NOTE: later persist can be used to store fuse index
    // when modifying items ability is added

    if (persist.current.fuse) {
      return persist.current.fuse
    }

    const list = flatMap(sets, (x, s) =>
      x.words.map((word, w) => ({
        label: word.label,
        index: w,
        setIndex: s,
      })),
    )
    return (persist.current.fuse = new Fuse(list, {
      keys: ['label'],
      threshold: 0.4,
    }))
  }, [sets, persist])

  const term = useDebounce(value, 100)
  const render = useCallback(
    (results: Fuse.FuseResult<SearchWord>[]) => (
      <>
        {results.map(({ item, refIndex }) => (
          <WordEditor
            getLabel={getLabel}
            key={`${item.setIndex}-${item.index}`}
            word={sets[item.setIndex].words[item.index]}
            dispatch={dispatch}
            {...getIndexes(sets, refIndex)}
          />
        ))}
      </>
    ),
    [sets, dispatch, getLabel],
  )

  const [results, setResults] = useState(() => render(fuse.search(term)))
  useEffect(() => {
    return setResults(render(value ? fuse.search(term) : []))
  }, [term, fuse, render, value])

  return <div style={{ display: hidden ? 'none' : 'block' }}>{results}</div>
}

function getIndexes(sets: WordSets, index: number) {
  for (let i = 0; i < sets.length; ++i) {
    const set = sets[i]
    const count = set.words.length

    if (count <= index) {
      index -= count
    } else return { setIndex: i, index }
  }
  throw new Error('Handle later')
}

function useDebounce<T>(value: T, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay], // Only re-call effect if value or delay changes
  )

  return debouncedValue
}
