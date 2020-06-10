import { ListCheckbox, ListItem, ListUnfold } from 'components/shared/ListItem'
import {
  WordsAppDataAction,
  WordsSet,
} from 'services/app-data/WordsManager.types'
import React, { CSSProperties, forwardRef, memo } from 'react'
import styles from './WordsListEditor.module.scss'

export type WordsSetEditorProps = {
  set: WordsSet
  index: number
  style?: CSSProperties
  expanded: boolean
  toggleFold: (index: number) => unknown
  dispatch: (action: WordsAppDataAction) => unknown
}

export const WordsSetEditor = memo(
  forwardRef<HTMLLIElement, WordsSetEditorProps>(function WordsSetEditor(
    { set, index, style, dispatch, expanded, toggleFold },
    ref,
  ) {
    return (
      // TODO: change to Box
      <ListItem ref={ref} style={style} className={styles.Set}>
        <div className={styles.Content}>
          <ListCheckbox
            checked={!!set.enabled}
            onChange={() => {
              dispatch({ type: 'toggle-set', payload: { index } })
            }}
          />
          <span className={styles.Label} onClick={() => toggleFold(index)}>
            {set.label}
          </span>
          <ListUnfold folded={!expanded} onClick={() => toggleFold(index)} />
        </div>
      </ListItem>
    )
  }),
)
