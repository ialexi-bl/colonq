import { ReactNode } from 'react'
import cn from 'clsx'

export type SliderProps = {
  defaultView: ReactNode
  extraView: ReactNode
  className?: string
  active?: boolean
}
export default function Slider({
  className,
  defaultView,
  extraView,
  active,
}: SliderProps) {
  return (
    // Full height is needed because when hidden content is taller
    // than visible, it becomes cut
    <div className={cn(className, 'h-full relative overflow-hidden')}>
      <div
        className={cn(
          'duration-500 transform',
          active && '-translate-x-full opacity-0',
        )}
      >
        {defaultView}
      </div>
      <div
        className={cn(
          'absolute inset-0 duration-500 transform',
          !active && 'translate-x-full opacity-0',
        )}
      >
        {extraView}
      </div>
    </div>
  )
}
