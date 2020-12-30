import * as React from 'react'
import cn from 'clsx'
import styles from './Toggle.module.scss'

export type ToggleProps = Omit<HTMLProps.input, 'onChange'> & {
  onChange?: (value: boolean, e: React.ChangeEvent<HTMLInputElement>) => unknown
}

const Toggle = ({ className, onChange, ...props }: ToggleProps) => (
  <label
    className={cn(className, 'relative inline-block cursor-pointer w-12 h-6')}
  >
    <input
      type={'checkbox'}
      className={cn('opacity-0 m-0 h-0 w-0', styles.ToggleInput)}
      onChange={onChange && ((e) => onChange?.(e.target.checked, e))}
      {...props}
    />
    <div className={cn('absolute inset-1 rounded-full', styles.Track)} />
    <div
      className={cn('absolute inset-y-0 w-6 h-6 rounded-full', styles.Slider)}
    />
  </label>
)
export default Toggle
