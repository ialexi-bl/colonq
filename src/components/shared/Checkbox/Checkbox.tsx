import React, { InputHTMLAttributes, useCallback } from 'react'
import cn from 'clsx'
import styles from './Checkbox.module.scss'

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  checked?: boolean
  onChange?: (
    value: boolean,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLSpanElement>,
  ) => unknown
}

export default ({ checked, className, onChange, ...props }: CheckboxProps) => (
  <span
    onKeyDown={(e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
        e.preventDefault() // Prevent scrolling down with space
        onChange?.(!checked, e)
      }
    }}
    tabIndex={0}
    className={cn(styles.Dot, checked && styles.Active, className)}
  >
    <input
      type={'checkbox'}
      className={styles.Input}
      checked={checked}
      onChange={useCallback((e) => onChange?.(e.target.checked, e), [onChange])}
      {...props}
    />
  </span>
)
