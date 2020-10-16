import React from 'react'
import cn from 'clsx'
import shapes from './bubble.shape.svg'
import styles from './Bubble.module.scss'
import useClipShape from 'hooks/shared/use-clip-shape'

export type BubbleProps = {
  className?: string
  /** Number between 0 and 1 */
  progress?: number
  variant?: 1 | 2 | 3 | 4
  icon: React.ReactNode
}
export default function Bubble({
  icon,
  className,
  variant = 1,
  progress = 1,
}: BubbleProps) {
  useClipShape('bubble', shapes)

  return (
    <div
      className={cn(
        'relative w-32 h-32',
        className,
        styles[`variant-${variant}`],
      )}
    >
      <div
        className={'absolute inset-0 bg-primary-500'}
        style={{ clipPath: clipPath(progress) }}
      />
      <div className={cn('bg-primary-900 p-6', styles.inner)}>{icon}</div>
    </div>
  )
}

const polygon = (points: [number, number][]) =>
  `polygon(${points.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(',')})`
function clipPath(p: number) {
  const tan = Math.tan(Math.PI * 2 * p)

  if (p < 1 / 8) {
    return polygon([
      [0.5, 0],
      [0.5, 0.5],
      [0.5 * (1 - tan), 0],
    ])
  } else if (p < 3 / 8) {
    return polygon([
      [0, 0],
      [0.5, 0],
      [0.5, 0.5],
      [0, 0.5 * (1 - 1 / tan)],
    ])
  } else if (p < 5 / 8) {
    return polygon([
      [0, 1],
      [0, 0],
      [0.5, 0],
      [0.5, 0.5],
      [0.5 * (1 + tan), 1],
    ])
  } else if (p < 7 / 8) {
    return polygon([
      [1, 1],
      [0, 1],
      [0, 0],
      [0.5, 0],
      [0.5, 0.5],
      [1, 0.5 * (1 + 1 / tan)],
    ])
  } else {
    return polygon([
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 0],
      [0.5, 0],
      [0.5, 0.5],
      [0.5 * (1 - tan), 0],
    ])
  }
}
