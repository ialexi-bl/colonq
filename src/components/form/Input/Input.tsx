import React, { forwardRef } from 'react'
import cn from 'clsx'
import paths from 'shapes/inputs.shape.svg'
import styles from './Input.module.scss'
import useClipShape from 'hooks/shared/use-svg-texture'

export type InputProps = HTMLProps.input & {
  state?: null | 'valid' | 'invalid'
  variant?: 1 | 2 | 3
}

/**
 * Input view. Adjusted to pass string value as the first
 * parameter to onChange
 * @param {InputProps} props
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, formNoValidate, variant = 1, ...props }, ref) => {
    useClipShape('input', paths)

    return (
      <input
        ref={ref}
        type={'text'}
        tabIndex={0}
        className={cn(
          'py-4 px-6 w-full outline-none',
          className,
          styles.Input,
          styles[`variant-${variant}`],
          state && styles[state],
        )}
        {...props}
      />
    )
  },
)
export default Input
