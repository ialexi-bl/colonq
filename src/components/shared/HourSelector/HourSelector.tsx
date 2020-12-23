import { range } from 'util/array'
import cn from 'clsx'

export type HourSelectorProps = {
  value: number
  onChange: (value: number) => unknown
  className?: string
}
export default function HourSelector({
  value,
  onChange,
  className,
}: HourSelectorProps) {
  return (
    <div className={cn(className, 'h-12 flex')}>
      <button onClick={() => onChange(value - 1)} className={'w-6 text-center'}>
        🢐
      </button>
      <div className={'w-6 h-full relative overflow-hidden'}>
        <div
          style={{ left: `${-value * 1.5}rem` }}
          className={'absolute inset-y-0 duration-200 flex'}
        >
          {range(0, 23).map((i) => (
            <div className={'w-6 text-center'} key={i}>
              {i}
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => onChange(value + 1)} className={'w-6 text-center'}>
        🢒
      </button>
    </div>
  )
}
