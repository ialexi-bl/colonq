import { Item, TwoLatestDisplayProps } from '.'
import React, { useRef } from 'react'
import cn from 'clsx'
import reduceFont from './scale-font'
import styles from './TwoLatestDisplay.module.scss'

/**
 * Displays words one by one, When new word appears, old one fades out half
 * its way, when the next word comes, it disappears and so on
 * @param props
 */
export function TwoLatestDisplay<TItem>({
  next,
  current,
  previous,
  previous2,
  className,
  component: Component,
}: TwoLatestDisplayProps<TItem>) {
  const iter = [previous2, previous, current].filter(Boolean) as Item<TItem>[]
  const last = useRef(1)

  return (
    <div className={cn(styles.Container, className)}>
      {iter.map((item) => (
        <div
          key={item.id}
          className={cn(styles.Transition, {
            [styles.TransitionHiding]: item.hiding,
            [styles.TransitionPrevious]: item === previous,
            [styles.TransitionPrevious2]: item === previous2,
          })}
          ref={(e) => {
            if (!e) return

            if (item === current) {
              const scale = (last.current = reduceFont(e))
              e.style.transform = `scale(${scale})`
            } else {
              const gone = item === previous2
              e.style.transform = `translateY(-100%) scale(${
                last.current * (gone ? 0.6 : 0.65)
              })`
            }
          }}
        >
          <Component active={item === current} item={item.data} next={next} />
        </div>
      ))}
    </div>
  )
}
