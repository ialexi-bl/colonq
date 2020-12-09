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
  const firstRender = useRef(true)
  const iter = [current, previous, previous2].filter(Boolean) as Item<TItem>[]
  const { current: transformed } = useRef<
    Record<string, 'curr' | 'prev' | 'prev1'>
  >({})

  let prevHeight = 0
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
              if (transformed[item.id] !== 'curr') {
                transformed[item.id] = 'curr'

                const scale = reduceFont(e)
                e.style.transform = `scale(${scale})`
                prevHeight = e.clientHeight * scale
              }
            } else if (item === previous) {
              if (transformed[item.id] !== 'prev') {
                transformed[item.id] = 'prev'
                e.style.transform = `translateY(${
                  item.hiding
                    ? '5rem'
                    : `-${prevHeight / 2 + e.clientHeight / 2}px`
                }) ${e.style.transform} scale(0.6)`
              }
            } else if (transformed[item.id] !== 'prev1') {
              transformed[item.id] = 'prev1'
              e.style.transform += ` scale(0.9)`
            }
          }}
        >
          <Component
            firstItem={(() => {
              const t = firstRender.current
              firstRender.current = false
              return t
            })()}
            active={item === current}
            item={item.data}
            next={next}
          />
        </div>
      ))}
    </div>
  )
}
