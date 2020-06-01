import { Item, TwoLatestDisplayProps } from '.'
import { cssUtil } from 'styles'
import { reduceSize } from './reduce-font'
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
  className,
  component: Component,
  words: { current, prev1, prev2 },
}: TwoLatestDisplayProps<TItem>) {
  const iter = [current, prev1, prev2].filter(Boolean) as Item<TItem>[]
  let size = 0

  return (
    <div className={cn(styles.Container, className)}>
      {iter.map((item) => (
        <div
          key={item.id}
          // NOTE: this ref may be called multiple times on component updates
          // and it may cause scaling component more than once.
          // This should not happend under normal circumstances, but it does,
          // for example, during hot
          ref={(e) => {
            if (!e) return

            if (item === current) {
              if (item.scale) return

              setTimeout(() => {
                item.scale = reduceSize(e)
                size = e.clientHeight * item.scale
              }, 0)
            } else if (!item.hiding) {
              const gone = item === prev2

              const scale = item.scale || 1
              const k = gone ? scale * 0.6 : scale * 0.65

              setTimeout(() => {
                const translate = size / 2 + (e.clientHeight * k) / 2 + 7
                e.style.transform = `translateY(-${
                  gone ? translate + 30 : translate
                }px) scale(${k})`
              }, 0)
            }
          }}
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
