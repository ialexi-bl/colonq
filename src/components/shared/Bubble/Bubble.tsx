import React from 'react'
import cn from 'clsx'
import shapes from './bubble.shape.svg'
import styles from './Bubble.module.scss'
import useClipShape from 'hooks/use-clip-shape'

export type BubbleProps = HTMLProps.div & {
  /** Number between 0 and 1 */
  disabled?: boolean
  progress?: number
  variant?: 1 | 2 | 3 | 4
  icon: React.ReactNode
}
export default function Bubble({
  icon,
  disabled,
  className,
  variant = 1,
  progress = 1,
  ...props
}: BubbleProps) {
  useClipShape('bubble', shapes)

  return (
    <div
      className={cn(
        'relative w-28 h-28',
        className,
        styles[`variant-${variant}`],
      )}
      {...props}
    >
      <div
        className={cn(
          'absolute inset-0 transition-colors duration-100',
          disabled ? 'bg-disabled-700' : 'bg-primary-500',
        )}
        style={{ clipPath: clipPath(progress) }}
      />
      <div
        className={cn(
          'p-6 transition-colors duration-100',
          styles.inner,
          disabled ? 'bg-disabled-1000' : 'bg-primary-900',
        )}
      >
        {icon}
      </div>
    </div>
  )
}

const polygon = (points: Array<[number, number]>) =>
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
