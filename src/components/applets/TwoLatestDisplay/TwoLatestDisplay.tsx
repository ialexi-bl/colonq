import { Item, TwoLatestDisplayProps } from '.'
import React, { ReactNode } from 'react'
import cn from 'clsx'
import styles from './TwoLatestDisplay.module.scss'

/**
 * Displays words one by one, When new word appears, old one fades out half
 * its way, when the next word comes, it disappears and so on
 * @param props
 */
// const transitionDuration = parseInt(styles.transitionDuration)
// const transitionClassName = styles.transitionClassName

export function TwoLatestDisplay<TItem>({
  next,
  component: Component,
  words: { current, prev1, prev2 },
}: TwoLatestDisplayProps<TItem>) {
  const iter = [prev2, prev1, current].filter(Boolean) as Item<TItem>[]

  return (
    <Container>
      {iter.map((item) => (
        // <CSSTransition
        //   key={item.id}
        //   timeout={transitionDuration}
        //   classNames={transitionClassName}
        // >
        <div
          key={item.id}
          className={cn(styles.Transition, {
            [styles.TransitionPrev1]: item === prev1,
            [styles.TransitionPrev2]: item === prev2,
            [styles.TransitionHiding]: item.hiding,
          })}
        >
          <Component active={item === current} item={item.data} next={next} />
        </div>
        // </CSSTransition>
      ))}
    </Container>
  )
}

const Container = ({ children }: { children: ReactNode }) => (
  <div className={styles.Container}>{children}</div>
)
