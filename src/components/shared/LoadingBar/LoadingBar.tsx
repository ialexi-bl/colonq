import { CSSTransition } from 'react-transition-group'
import React, { useEffect, useState } from 'react'
import cn from 'clsx'
import paths from './loading-bar.shape.svg'
import styles from './LoadingBar.module.scss'
import useClipShape from 'hooks/use-clip-shape'

const CLASS_NAME = styles.transitionClassName
const TIMEOUT = {
  enter: parseInt(styles.transitionDuration),
  exit: parseInt(styles.transitionDurationExit),
}

export default function Loadingbar({
  progress,
  visible,
}: {
  progress: number
  visible?: boolean
}) {
  useClipShape('loading-bar', paths)

  const [p, setp] = useState(progress)
  useEffect(() => {
    setp(progress)
    if (progress >= 1) return

    const interval = setInterval(() => {
      setp((p) => {
        if (p >= 1) {
          clearInterval(interval)
          return 1
        }
        return Math.min(p + Math.random() * 0.04, 0.9)
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [progress])

  return (
    <div className={cn('fixed inset-x-0 top-0 z-loading', styles.Track)}>
      <CSSTransition timeout={TIMEOUT} classNames={CLASS_NAME} in={visible}>
        <div
          style={{ transform: `scaleX(${format(p)})` }}
          className={cn(
            'w-full h-full bg-primary-800 origin-left',
            styles.Fill,
          )}
        />
      </CSSTransition>
    </div>
  )
}
const format = (p: number) => ~~((p < 0 ? 0 : p > 1 ? 1 : p) * 100) / 100
