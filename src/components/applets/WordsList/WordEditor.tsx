import { ListCheckbox, ListItem } from 'components/shared/ListItem'
import { TransitionStatus } from 'react-transition-group/Transition'
import { Word, WordsAppDataAction } from 'services/app-data/WordsManager.types'
import React, { CSSProperties, forwardRef, memo } from 'react'
import cn from 'clsx'
import styles from './WordsListEditor.module.scss'

export type WordEditorProps = {
  word: Word
  index: number
  state?: TransitionStatus
  style?: CSSProperties
  virtual?: boolean
  setIndex: number
  className?: string
  dispatch: (action: WordsAppDataAction) => unknown
}

export const WordEditor = memo(
  forwardRef<HTMLLIElement, WordEditorProps>(function WordEditor(
    { word, index, style, setIndex, dispatch, className, virtual },
    ref,
  ) {
    return (
      <ListItem
        ref={ref}
        style={style}
        className={cn(styles.Word, virtual && styles.VirtualWord, className)}
      >
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

const removeBrackets = (word: string) => {
  word = word.replace(/\\/g, '')
  const match = word.match(/^(.*?)\[(.+)\](.*)$/)
  if (!match) return word

  const [, start, letters, end] = match
  const correct =
    letters.length > 1
      ? letters.split('').find((x) => x.toLowerCase() !== x) || letters[0]
      : letters
  return (
    <span>
      {start}
      <strong className={styles.CorrectLetter}>{correct.toLowerCase()}</strong>
      {end}
    </span>
  )
}
