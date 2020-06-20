import { Checkbox } from 'components/form/Checkbox'
import { VirtualizedGroupProps } from 'components/shared/VirtualizedNestedList'
import { WordsData } from 'services/app-data/WordsManager.types'
import React from 'react'
import UnfoldButton from 'components/shared/UnfoldButton/UnfoldButton'
import cn from 'clsx'
import styles from './VirtualizedWord.module.scss'

export function VirtualizedWordGroup({
  elementRef,
  toggleFold,
  groupIndex,
  className,
  transform,
  expanded,
  data,
  height = 48,
}: VirtualizedGroupProps<WordsData> & {
  height?: number
}) {
  const group = data[groupIndex]

  return (
    <li
      className={cn(styles.VirtualizedGroup, className)}
      style={{ transform, height }}
      ref={elementRef}
    >
      <Checkbox checked={group.enabled} className={styles.Checkbox} />
      <p className={styles.Label}>{group.label}</p>
      <UnfoldButton
        onClick={() => toggleFold(groupIndex)}
        folded={!expanded}
        className={styles.UnfoldButton}
      />
    </li>
  )
}
