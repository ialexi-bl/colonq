import { VirtualizedItemProps } from 'components/shared/VirtualizedList'
import Checkbox from 'components/form/Checkbox'
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
  dispatch,
  data,
  height = 48,
}: VirtualizedItemProps<any, any> & {
  height?: number
}) {
  const item = data[groupIndex].words[itemIndex]

  return (
    <li
      className={cn(styles.VirtualizedItemContainer, className)}
      style={{ transform, height: height - 5 }}
      ref={elementRef}
    >
      <div
        className={cn(styles.VirtualizedItem, {
          [styles.collapsing]: collapsing,
          [styles.expanding]: expanding,
        })}
      >
        <div className={styles.ElementContainer}>
          <Checkbox
            onClick={() =>
              dispatch({
                type: 'toggle-item',
                payload: { groupIndex, itemIndex },
              })
            }
            checked={item.enabled}
            className={styles.Checkbox}
          />
        </div>
        <p className={styles.Label}>{item.label}</p>
      </div>
    </li>
  )
}
