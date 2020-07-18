import { VirtualizedGroupProps } from 'components/shared/VirtualizedList'
import {
  WordsData,
  WordsEditAction,
} from 'services/applets/WordsAppletManager/types'
import Checkbox from 'components/form/Checkbox'
import React from 'react'
import UnfoldButton from 'components/shared/UnfoldButton'
import cn from 'clsx'
import styles from './VirtualizedWord.module.scss'

export default function VirtualizedWordGroup({
  elementRef,
  toggleFold,
  groupIndex,
  className,
  transform,
  expanded,
  dispatch,
  data,
  height = 48,
}: VirtualizedGroupProps<WordsData, WordsEditAction> & {
  height?: number
}) {
  const group = data[groupIndex]

  return (
    <li
      className={cn(styles.VirtualizedGroup, className)}
      style={{ transform, height: height - 5 }}
      ref={elementRef}
    >
      <div className={styles.ElementContainer}>
        <Checkbox
          onChange={() =>
            dispatch({
              type: 'toggle-group',
              payload: { groupIndex },
            })
          }
          checked={group.enabled}
          className={styles.Checkbox}
        />
      </div>
      <p className={styles.Label}>{group.label}</p>
      <div className={styles.ElementContainer}>
        <UnfoldButton
          onClick={() => toggleFold(groupIndex)}
          folded={!expanded}
          className={styles.UnfoldButton}
        />
      </div>
    </li>
  )
}