import { AppletSettingsContext } from '../AppletSettings'
import { GetSettingsLabel, WordEditor } from './WordEditor'
import {
  Word,
  WordsData,
  WordsAppDataDispatch,
  WordsGroup,
} from 'services/app-data/WordsManager.types'
import { WordsSetEditor } from './WordsSetEditor'
import { listItemHeight } from 'components/shared/ListItem'
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import styles from './WordsListEditor.module.scss'

// TODO: split this mess into multiple modules

const height = parseFloat(listItemHeight) + parseFloat(styles.margin)
const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
const duration = parseInt(styles.transitionDuration)
const extraItems = 8

enum ItemStatus {
  FOLDING,
  EXPANDED,
  UNFOLDING,
  COLLAPSED,
}
enum ViewType {
  WORD,
  SET,
  ANIMATING_WORD,
}
const EXPANDED = {
  [ItemStatus.UNFOLDING]: 1,
  [ItemStatus.EXPANDED]: 1,
}
const COLLAPSED = {
  [ItemStatus.COLLAPSED]: 1,
  [ItemStatus.FOLDING]: 1,
}
const ANIMATING = {
  [ItemStatus.UNFOLDING]: 1,
  [ItemStatus.FOLDING]: 1,
}

export type WordsListEditorProps = {
  sets: WordsData
  hidden?: boolean
  dispatch: WordsAppDataDispatch
  getLabel: GetSettingsLabel
}

export const WordsListEditor = memo(function WordsListEditor({
  sets,
  hidden,
  dispatch,
  getLabel,
}: WordsListEditorProps) {
  const setScrollListener = useContext(AppletSettingsContext)
  const [status, setStatus] = useState<ItemStatus[]>(() =>
    [...Array(sets.length)].fill(ItemStatus.COLLAPSED),
  )
  const [containerHeight, setContainerHeight] = useState<number | 'auto'>(() =>
    calculateHeight(sets, status),
  )
  const [start, setStart] = useState(0)
  const [views, setViews] = useState<View[]>([])

  const timeouts = useRef([...Array(sets.length)].fill(0))
  const scrollTop = useRef(0)
  const last = useRef(0)

  const toggleFold = useCallback(
    (i: number) => {
      setStatus((status) => {
        const exp = status[i] in EXPANDED
        const col = status[i] in COLLAPSED
        if (exp) {
          status[i] = ItemStatus.FOLDING
        } else if (col) {
          status[i] = ItemStatus.UNFOLDING
        }
        setContainerHeight(calculateHeight(sets, status))

        clearTimeout(timeouts.current[i])
        timeouts.current[i] = setTimeout(() => {
          setStatus((status) => {
            if (exp) {
              status[i] = ItemStatus.COLLAPSED
            } else if (col) {
              status[i] = ItemStatus.EXPANDED
            }
            setContainerHeight(calculateHeight(sets, status))
            return [...status]
          })
        }, duration)

        return [...status]
      })
    },
    [sets],
  )

  const updateViews = useCallback(() => {
    const now = performance.now()
    if (now - last.current < 100) return
    last.current = now

    const scroll = scrollTop.current / rem
    let setIndex = -1
    let wordIndex = -1

    const index = Math.max(Math.floor(scroll / height) - extraItems, 0)
    const start = index

    for (let i = 0, acc = 0; i < sets.length; ++i) {
      const set = sets[i]
      const exp = status[i] in EXPANDED
      const count = exp ? set.words.length + 1 : 1

      if (acc + count <= index) {
        acc += count
      } else {
        setIndex = i
        wordIndex = index - acc === 0 ? -1 : index - acc - 1
        break
      }
    }
    if (setIndex < 0) throw new Error('Handle later')

    let current =
      wordIndex < 0 ? sets[setIndex] : sets[setIndex].words[wordIndex]

    const views: View[] = [item2view(current, setIndex, wordIndex)]

    const target = window.innerHeight / rem + extraItems * height
    let currHeight = 0

    while (currHeight < target) {
      if ('setIndex' in current) {
        if (wordIndex < sets[setIndex].words.length - 1) {
          wordIndex++
          current = sets[setIndex].words[wordIndex]
        } else if (setIndex < sets.length - 1) {
          ++setIndex
          wordIndex = -1
          current = sets[setIndex]
        } else break
      } else {
        // Animating folding and unfolding
        if (status[setIndex] in ANIMATING) {
          const items = sets[setIndex].words.slice(
            0,
            Math.floor((window.innerHeight * 1.3) / rem / height),
          )
          const length = items.length

          // eslint-disable-next-line no-loop-func
          items.forEach((word, index) => {
            views.push({
              word,
              index,
              length,
              setIndex,
              type: ViewType.ANIMATING_WORD,
              expanding: status[setIndex] in EXPANDED,
            })
          })

          if (setIndex < sets.length - 1) {
            ++setIndex
            wordIndex = -1
            current = sets[setIndex]
          } else break
        } else if (status[setIndex] in EXPANDED && current.words.length > 0) {
          current = current.words[0]
          wordIndex = 0
        } else if (setIndex < sets.length - 1) {
          ++setIndex
          wordIndex = -1
          current = sets[setIndex]
        } else break
      }

      views.push(item2view(current, setIndex, wordIndex))
      currHeight += height
    }

    setStart(start)
    setViews(views)
  }, [sets, status])

  useEffect(() => {
    updateViews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, sets])

  useEffect(() => {
    if (hidden) {
      setScrollListener(() => {})
    }
    setScrollListener((e) => {
      scrollTop.current = e.scrollTop
      updateViews()
    })
  }, [hidden, setScrollListener, updateViews])

  let acc = start - 1
  let extraAcc = acc
  let contracting = false

  return (
    <ul
      className={styles.EditorContainer}
      style={{
        display: hidden ? 'none' : 'block',
        height: containerHeight,
      }}
    >
      {views.map((view) => {
        ++extraAcc

        let ref: React.RefCallback<HTMLLIElement> | undefined
        if (contracting && acc !== extraAcc) {
          const curr = acc + 1
          ref = (e) => {
            if (!e) return
            setTimeout(() => {
              e.style.transform = `translateY(${curr * rem * height}px)`
            }, 10)
          }
        }

        if (view.type === ViewType.WORD) {
          ++acc
          return (
            <WordEditor
              virtual
              style={{
                transform: `translateY(${extraAcc * rem * height}px)`,
                animation: 'none',
              }}
              ref={ref}
              getLabel={getLabel}
              word={view.word}
              setIndex={view.setIndex}
              dispatch={dispatch}
              index={view.index}
              key={`${view.setIndex}-${view.index}`}
            />
          )
        } else if (view.type === ViewType.SET) {
          ++acc

          return (
            <WordsSetEditor
              style={{
                transform: `translateY(${extraAcc * rem * height}px)`,
              }}
              ref={ref}
              toggleFold={toggleFold}
              key={`${view.index}`}
              dispatch={dispatch}
              set={view.set}
              index={view.index}
              expanded={status[view.index] in EXPANDED}
            />
          )
        } else {
          if (view.expanding) {
            ++acc
          } else {
            contracting = true
          }

          return (
            <WordEditor
              virtual
              getLabel={getLabel}
              key={`${view.setIndex}-${view.index}`}
              word={view.word}
              dispatch={dispatch}
              setIndex={view.setIndex}
              index={view.index}
              className={
                view.expanding ? styles.Appearing : styles.Disappearing
              }
              style={{
                transform: `translateY(${extraAcc * rem * height}px)`,
                animationDuration: view.expanding
                  ? `${500 + 50 * view.index}ms`
                  : `${Math.max(500 - 50 * view.index, 0)}ms`,
              }}
            />
          )
        }
      })}
    </ul>
  )
})

type View =
  // #region
  | {
      type: ViewType.WORD
      word: Word
      index: number
      setIndex: number
    }
  | {
      type: ViewType.SET
      index: number
      set: WordsGroup
    }
  | {
      type: ViewType.ANIMATING_WORD
      word: Word
      index: number
      length: number
      setIndex: number
      expanding: boolean
    }
// #endregion

function calculateHeight(sets: WordsData, status: ItemStatus[]) {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
  let count = 0
  for (let i = 0, l = sets.length; i < l; i++) {
    count +=
      status[i] in EXPANDED || status[i] === ItemStatus.FOLDING
        ? sets[i].words.length + 1
        : 1
  }
  return count * height * rem
}

function item2view(
  item: WordsGroup | Word,
  setIndex: number,
  wordIndex: number,
): View {
  if ('setIndex' in item) {
    return {
      type: ViewType.WORD,
      word: item,
      index: wordIndex,
      setIndex,
    }
  } else {
    return {
      type: ViewType.SET,
      set: item,
      index: setIndex,
    }
  }
}
