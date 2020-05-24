import { TwoLatestDisplayItem, TwoLatestItems } from '../TwoLatestDisplay'
import { Word, WordsData } from 'services/app-data/WordsAppData.types'
import { WordsManager } from 'services/app-data/WordsManager'
import { useAppData } from 'hooks/use-app-data'
import { useCallback, useEffect, useRef, useState } from 'react'

const random = (max: number) => Math.floor(Math.random() * max)
const noWords: TwoLatestItems<any> = {
  current: null,
  prev1: null,
  prev2: null,
}
const noPreviousWords = {
  order: [] as string[],
  hash: {} as Record<string, true>,
}
const filterWords = (data: WordsData, manager: WordsManager) =>
  data.sets.reduce<Word[]>(
    (acc, set) =>
      acc.concat(
        set.words.filter(
          (word) => word.enabled && manager.wordRegex.test(word.label),
        ),
      ),
    [],
  )

export function useWords(manager: WordsManager, onLoad?: () => unknown) {
  const { loading, data } = useAppData(manager, onLoad)
  const [words, setWords] = useState<TwoLatestItems<Word>>(noWords)
  // * REVIEW: maybe change to FastList one day (https://github.com/isaacs/fast-list)
  const previousWords = useRef(noPreviousWords)

  const [cleanData, setCleanData] = useState(
    () => data && filterWords(data, manager),
  )

  const getNewWords = useCallback(
    (
      { current, prev1 }: TwoLatestItems<Word>,
      hiding?: boolean,
    ): TwoLatestItems<Word> => {
      const count = cleanData ? cleanData.length : 0

      switch (count) {
        case 0: {
          return noWords
        }
        case 1: {
          const word = cleanData![0]
          return {
            current: {
              data: word,
              id: `${word.setId}-${word.id}-${Math.random()}`,
            },
            prev1: current && {
              ...current,
              hiding,
            },
            prev2: prev1,
          }
        }
        default: {
          const two = count === 2
          const currId = current?.id
          const prevId = prev1?.id
          const { order, hash } = previousWords.current

          let item: TwoLatestDisplayItem<Word>
          do {
            const word = cleanData![random(count)]

            item = {
              id: `${word.setId}-${word.id}`,
              data: word,
            }
          } while (
            item.id in hash ||
            item.id === currId ||
            // eslint-disable-next-line no-unmodified-loop-condition
            (!two && item.id === prevId)
          )

          if (two) item.id += `-${Math.random()}`

          if (order.length > count * 0.4) {
            delete hash[order[0]]
            order.shift()
          }
          hash[item.id] = true
          order.push(item.id)

          return {
            current: item,
            prev1: current && {
              ...current,
              hiding,
            },
            prev2: prev1,
          }
        }
      }
    },
    [cleanData],
  )

  const hidden = useRef(false)
  useEffect(() => {
    if (data) {
      const filtered = filterWords(data, manager)
      setCleanData(filtered)

      if (!hidden.current) {
        const word = filtered[~~(Math.random() * filtered.length)]
        setWords({
          current: word
            ? {
                id: `${word.setId}-${word.id}`,
                data: word,
              }
            : null,
          prev1: null,
          prev2: null,
        })
      }
      hidden.current = false
    } else {
      setWords(noWords)
      setCleanData(null)
    }
    previousWords.current = noPreviousWords
  }, [data, manager])

  const next = useCallback(
    (hiding = false) => {
      hidden.current = hiding
      setWords((words) => (data ? getNewWords(words, hiding) : noWords))
    },
    [data, getNewWords],
  )

  return {
    loading,
    words,
    next,
  }
}
