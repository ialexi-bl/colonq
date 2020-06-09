import React, { InputHTMLAttributes } from 'react'
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

/**
 * Simple checkbox
 * @param {CheckboxProps} props
 */
export const Checkbox = ({
  checked,
  className,
  onChange,
  tabIndex,
  ...props
}: CheckboxProps) => (
  <label className={className}>
    <input
      type={'checkbox'}
      checked={checked}
      className={styles.CheckboxInput}
      onChange={onChange && ((e) => onChange?.(e.target.checked, e))}
      {...props}
    />
    <span className={cn(styles.Checkbox, checked && styles.checked)} />
  </label>
)
