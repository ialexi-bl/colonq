import { TwoLatestDisplayItem, TwoLatestItems } from '../TwoLatestDisplay'
import { Word, WordsData } from 'services/app-data/WordsManager.types'
import { WordsManager } from 'services/app-data/WordsManager'
import { useAppData } from 'hooks/app-data'
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
const filterWords = (sets: WordsData, manager: WordsManager) =>
  sets.reduce<Word[]>(
    (acc, set) =>
      acc.concat(
        set.words.filter(
          (word) => word.enabled && manager.wordRegex.test(word.label),
        ),
      ),
    [],
  )

export function useWords(manager: WordsManager, onLoad?: () => unknown) {
  const { loading, data: sets } = useAppData(manager, onLoad)
  const [words, setWords] = useState<TwoLatestItems<Word>>(noWords)
  // * REVIEW: maybe change to FastList one day (https://github.com/isaacs/fast-list)
  const previousWords = useRef(noPreviousWords)

  const [cleanData, setCleanData] = useState(
    () => sets && filterWords(sets, manager),
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
        default: {
          const { order, hash } = previousWords.current

          let item: TwoLatestDisplayItem<Word>
          do {
            const word = cleanData![random(count)]

            item = {
              id: `${word.groupIndex}-${word.id}`,
              data: word,
            }
          } while (item.id in hash)

          if (count > 3) {
            if (order.length > count * 0.4) {
              delete hash[order[0]]
              order.shift()
            }
            hash[item.id] = true
            order.push(item.id)
          }
          item.id += `-${Math.random()}`

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
    if (sets) {
      const filtered = filterWords(sets, manager)
      setCleanData(filtered)

      if (!hidden.current) {
        const word = filtered[~~(Math.random() * filtered.length)]
        setWords({
          current: word
            ? {
                id: `${word.groupIndex}-${word.id}-${Math.random()}`,
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
  }, [manager, sets])

  const next = useCallback(
    (hiding = false) => {
      hidden.current = hiding
      setWords((words) => (sets ? getNewWords(words, hiding) : noWords))
    },
    [getNewWords, sets],
  )

  return {
    loading,
    words,
    next,
  }
}
