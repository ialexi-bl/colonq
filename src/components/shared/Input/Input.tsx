import React, { InputHTMLAttributes, forwardRef, useCallback } from 'react'
import cn from 'clsx'
import styles from './Input.module.scss'

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  valid?: boolean
  invalid?: boolean
  onChange?: (value: string, e: React.KeyboardEvent) => unknown
}

/**
 * Input element, modified to return string value as
 * the first parameter for onChange listener
 * @param props
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, invalid, valid, formNoValidate, ...props }, ref) => (
    <input
      ref={ref}
      type={'text'}
      tabIndex={0}
      className={cn(className, styles.Input, {
        [styles.Invalid]: invalid,
        [styles.Valid]: valid,
      })}
      onChange={useCallback((e) => onChange?.(e.target.value, e), [onChange])}
      {...props}
    />
  ),
)
