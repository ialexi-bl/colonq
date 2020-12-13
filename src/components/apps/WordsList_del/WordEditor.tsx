// @ts-nocheck
/* eslint-disable */
import { TransitionStatus } from 'react-transition-group/Transition'
import {
  Word,
  WordsEditAction,
} from 'services/applets/WordsAppletManager/types'
import { CSSProperties, ReactNode, forwardRef, memo } from 'react';
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
  dispatch: (action: WordsEditAction) => unknown
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
              payload: { itemIndex: index, groupIndex: setIndex },
            })
          }}
        />
        <span className={styles.Label}>{getLabel(word)}</span>
      </ListItem>
    )
  }),
)
