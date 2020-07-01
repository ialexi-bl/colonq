import { TransitionStatus } from 'react-transition-group/Transition'
import { Word, WordsAppDataAction } from 'services/applets/WordsAppletManager/types'
import React, { CSSProperties, ReactNode, forwardRef, memo } from 'react'
import cn from 'clsx'
import styles from './WordsListEditor.module.scss'

export type GetSettingsLabel = (word: Word) => ReactNode
export type WordEditorProps = {
  word: Word
  index: number
  state?: TransitionStatus
  style?: CSSProperties
  virtual?: boolean
  setIndex: number
  className?: string
  dispatch: (action: WordsAppDataAction) => unknown
  getLabel: GetSettingsLabel
}

export const WordEditor = memo(
  forwardRef<HTMLLIElement, WordEditorProps>(function WordEditor(
    { word, index, style, setIndex, dispatch, className, virtual, getLabel },
    ref,
  ) {
    return (
      // TODO: change to Box
      <ListItem
        ref={ref}
        style={style}
        className={cn(styles.Word, virtual && styles.VirtualWord, className)}
      >
        <ListCheckbox
          checked={word.enabled}
          onChange={() => {
            dispatch({
              type: 'toggle-item',
              payload: { index, groupIndex: setIndex },
            })
          }}
        />
        <span className={styles.Label}>{getLabel(word)}</span>
      </ListItem>
    )
  }),
)
