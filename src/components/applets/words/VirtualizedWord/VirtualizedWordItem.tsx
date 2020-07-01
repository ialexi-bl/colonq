import { VirtualizedItemProps } from 'components/shared/VirtualizedNestedList'
import { WordsData } from 'services/applets/WordsAppletManager/types'
import Checkbox from 'components/form/Checkbox'
import React from 'react'
import cn from 'clsx'
import styles from './VirtualizedWord.module.scss'

export default function VirtualizedWordItem({
  elementRef,
  groupIndex,
  collapsing,
  className,
  itemIndex,
  expanding,
  transform,
  data,
  height = 48,
}: VirtualizedItemProps<WordsData> & {
  height?: number
}) {
  const item = data[groupIndex].words[itemIndex]

  return (
    <li
      className={cn(styles.VirtualizedItemContainer, className)}
      style={{ transform, height }}
      ref={elementRef}
    >
      <div
        className={cn(styles.VirtualizedItem, {
          [styles.collapsing]: collapsing,
          [styles.expanding]: expanding,
        })}
      >
        <Checkbox checked={item.enabled} className={styles.Checkbox} />
        <p className={styles.Label}>{item.label}</p>
      </div>
    </li>
  )
}
