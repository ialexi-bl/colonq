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
export function TwoLatestDisplay<TItem, TNext extends Function>({
  next,
  current,
  previous,
  previous2,
  className,
  component: Component,
}: TwoLatestDisplayProps<TItem, TNext>) {
  const iter = [previous2, previous, current].filter(Boolean) as Item<TItem>[]

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
              if (item.transformed !== 'curr') {
                item.transformed = 'curr'
                e.style.transform = `scale(${reduceFont(e)})`
              }
            } else if (item === previous) {
              if (item.transformed !== 'prev') {
                item.transformed = 'prev'
                e.style.transform = `translateY(${
                  item.hiding ? '5rem' : '-100%'
                }) ${e.style.transform} scale(0.6)`
              }
            } else if (item.transformed !== 'prev1') {
              item.transformed = 'prev1'
              e.style.transform += ` scale(0.9)`
            }
          }}
        >
          <Component active={item === current} item={item.data} next={next} />
        </div>
      ))}
    </div>
  )
}
