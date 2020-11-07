import React from 'react'
import cn from 'clsx'
import paths from './progress-bar.shape.svg'
import styles from './ProgressBar.module.scss'
import useClipShape from 'hooks/use-clip-shape'

export type ProgressBarProps = HTMLProps.div & {
  /** Number from 0 to 1 */
  progress: number
}

const ProgressBar = ({ progress, className, ...props }: ProgressBarProps) => (
  useClipShape('progress-bar', paths),
  (
    <div className={cn('p-4', className)}>
      <div
        className={cn('bg-secondary-400 h-3', styles.ProgressBar)}
        {...props}
      >
        <div
          style={{ width: `${toPercent(progress)}%` }}
          className={'duration-150 bg-primary-700 h-full'}
        />
      </div>
    </div>
  )
)
export default ProgressBar

const toPercent = (p: number) => 5 + Math.round(normalize(p) * 95)
const normalize = (p: number) => (p > 1 ? 1 : p < 0 ? 0 : p)
