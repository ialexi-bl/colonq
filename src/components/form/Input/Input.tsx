import { memo } from 'react'
import cn from 'clsx'
import paths from './inputs.shape.svg'
import styles from './Input.module.scss'
import useClipShape from 'hooks/use-clip-shape'

export type InvisibleInputProps = HTMLProps.input & {
  state?: null | 'valid' | 'invalid' | 'warning'
}
export type InputProps = InvisibleInputProps & {
  variant?: 1 | 2 | 3
}

/**
 * Input view. Adjusted to pass string value as the first
 * parameter to onChange
 * @param {InputProps} props
 */
const Input = memo(function Input({
  state,
  className,
  formNoValidate,
  variant = 1,
  ...props
}: InputProps) {
  useClipShape('input', paths)

  return (
    <input
      type={'text'}
      tabIndex={0}
      className={cn(
        'py-4 px-6 outline-none',
        className,
        styles.Input,
        styles[`variant-${variant}`],
        props.readOnly && styles.readonly,
        state && styles[state],
      )}
      {...props}
    />
  )
})
export default Input

export const InvisibleInput = ({
  state,
  className,
  ...props
}: InvisibleInputProps) => (
  <input
    type={'text'}
    className={cn(
      className,
      'outline-none p-2',
      props.readOnly && styles.readonly,
      styles.InvisibleInput,
      state && styles[state],
    )}
    {...props}
  />
)
