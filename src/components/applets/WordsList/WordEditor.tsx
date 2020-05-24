import { ListCheckbox, ListItem } from 'components/shared/ListItem'
import { TransitionStatus } from 'react-transition-group/Transition'
import { Word, WordsAppDataAction } from 'services/app-data/WordsAppData.types'
import React, { CSSProperties, forwardRef, memo } from 'react'
import cn from 'clsx'
import styles from './WordsListEditor.module.scss'

export type WordEditorProps = {
  word: Word
  index: number
  state?: TransitionStatus
  style?: CSSProperties
  setIndex: number
  className?: string
  dispatch: (action: WordsAppDataAction) => unknown
}

const removeBrackets = (word: string) => {
  const match = word.match(/^(.*?)\[(.+)\](.*)$/)
  if (!match) return word

  const [, start, letters, end] = match
  const correct =
    letters.length > 1
      ? letters.split('').find((x) => x.toLowerCase() !== x) || letters[0]
      : letters
  return (
    <>
      {start}
      <strong className={styles.CorrectLetter}>{correct.toLowerCase()}</strong>
      {end}
    </>
  )
}

export const WordEditor = memo(
  forwardRef<HTMLLIElement, WordEditorProps>(function WordEditor(
    { word, index, style, setIndex, dispatch, className },
    ref,
  ) {
    return (
      <ListItem ref={ref} style={style} className={cn(styles.Word, className)}>
        <ListCheckbox
          checked={word.enabled}
          onChange={() => {
            dispatch({ type: 'toggle-item', payload: { index, setIndex } })
          }}
        />
        <span className={styles.Label}>{removeBrackets(word.label)}</span>
      </ListItem>
    )
  }),
)
