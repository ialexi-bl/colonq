import { KeyboardEvent } from 'react'
import { range } from 'util/array'
import cn from 'clsx'

export type HourSelectorProps = {
  value: number
  onChange: (value: number) => unknown
  disabled?: boolean
  className?: string
}
export default function HourSelector({
  value,
  onChange,
  disabled,
  className,
}: HourSelectorProps) {
  const keydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' && value < 23) onChange(value + 1)
    if (e.key === 'ArrowLeft' && value > 0) onChange(value - 1)
  }
  return (
    <div
      style={{
        clipPath: 'polygon(3% 5%, 95% 0, 100% 93%, 0 100%)',
      }}
      className={cn(
        className,
        disabled ? 'bg-disabled-1000' : 'bg-primary-800',
        'h-8 text-lg flex text-center duration-200',
      )}
    >
      <button
        onKeyDown={keydown}
        onClick={() => value > 0 && onChange(value - 1)}
        disabled={disabled}
        className={'w-6 duration-100 focus:bg-primary-900'}
      >
        🢐
      </button>
      <div className={'w-6 h-full relative overflow-hidden'}>
        <div
          style={{ left: `${-value * 1.5}rem` }}
          className={'absolute inset-y-0 duration-200 flex items-center'}
        >
          {range(0, 23).map((i) => (
            <div className={'w-6'} key={i}>
              {i}
            </div>
          ))}
        </div>
      </div>
      <button
        onKeyDown={keydown}
        onClick={() => value < 23 && onChange(value + 1)}
        disabled={disabled}
        className={'w-6 duration-100 focus:bg-primary-900'}
      >
        🢒
      </button>
    </div>
  )
}
