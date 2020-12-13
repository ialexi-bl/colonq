import { memo } from 'react';
import cn from 'clsx'
import paths from './inputs.shape.svg'
import styles from './Input.module.scss'
import useClipShape from 'hooks/use-clip-shape'

export type InputProps = HTMLProps.input & {
  state?: null | 'valid' | 'invalid' | 'warning'
  variant?: 1 | 2 | 3
}

/**
 * Input view. Adjusted to pass string value as the first
 * parameter to onChange
 * @param {InputProps} props
 */
const Input = memo(function Input({
  className,
  state,
  formNoValidate,
  readOnly,
  variant = 1,
  ...props
}: InputProps) {
  useClipShape('input', paths)

  return (
    <input
      type={'text'}
      readOnly={readOnly}
      tabIndex={0}
      className={cn(
        'py-4 px-6 outline-none',
        className,
        styles.Input,
        styles[`variant-${variant}`],
        readOnly && styles.readonly,
        state && styles[state],
      )}
      {...props}
    />
  )
})
export default Input
