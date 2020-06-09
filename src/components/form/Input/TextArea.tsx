import React, { TextareaHTMLAttributes } from 'react'
import cn from 'clsx'
import styles from './Input.module.scss'

export type InputProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
> & {
  invalid?: boolean
  onChange?: (value: string, e: React.ChangeEvent) => unknown
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
    rows={5}
    tabIndex={0}
    className={cn(className, styles.Input, invalid && styles.invalid)}
    onChange={onChange && ((e) => onChange(e.target.value, e))}
    {...props}
  />
)
