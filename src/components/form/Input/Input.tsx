import React, { InputHTMLAttributes, forwardRef } from 'react'
import cn from 'clsx'
import styles from './Input.module.scss'

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  state?: null | 'valid' | 'invalid'
  onChange?: (value: string, e: React.ChangeEvent) => unknown
}

/**
 * Input view. Adjusted to pass string value as the first
 * parameter to onChange
 * @param {InputProps} props
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, state, formNoValidate, ...props }, ref) => (
    <input
      ref={ref}
      type={'text'}
      tabIndex={0}
      className={cn(className, styles.Input, state && styles[state])}
      onChange={onChange && ((e) => onChange(e.target.value, e))}
      {...props}
    />
  ),
)
export default Input
