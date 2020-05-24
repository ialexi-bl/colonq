import React, { TextareaHTMLAttributes, useCallback } from 'react'
import cn from 'clsx'
import styles from './Input.module.scss'

export type InputProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
> & {
  invalid?: boolean
  onChange?: (value: string, e: React.KeyboardEvent) => unknown
}

/**
 * Input element, modified to return string value as
 * the first parameter for onChange listener
 * @param props
 */
export const TextArea = ({
  className,
  onChange,
  invalid,
  ...props
}: InputProps) => (
  <textarea
    tabIndex={0}
    rows={5}
    className={cn(className, styles.Input, invalid && styles.Invalid)}
    onChange={useCallback((e) => onChange?.(e.target.value, e), [onChange])}
    {...props}
  />
)
