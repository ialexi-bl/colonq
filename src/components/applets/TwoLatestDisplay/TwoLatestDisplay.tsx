import { Item, TwoLatestDisplayProps } from '.'
import { cssUtil } from 'styles'
import React from 'react'
import cn from 'clsx'
import styles from './TwoLatestDisplay.module.scss'

/**
 * Displays words one by one, When new word appears, old one fades out half
 * its way, when the next word comes, it disappears and so on
 * @param props
 */

export function TwoLatestDisplay<TItem>({
  next,
  component: Component,
  words: { current, prev1, prev2 },
}: TwoLatestDisplayProps<TItem>) {
  const iter = [prev2, prev1, current].filter(Boolean) as Item<TItem>[]

  return (
    <div className={styles.Container}>
      {iter.map((item) => (
        <div
          key={item.id}
          className={cn(styles.Transition, cssUtil.centered, {
            [styles.TransitionPrev1]: item === prev1,
            [styles.TransitionPrev2]: item === prev2,
            [styles.TransitionHiding]: item.hiding,
          })}
        >
          <Component active={item === current} item={item.data} next={next} />
        </div>
      ))}
    </div>
  )
}
