import * as React from 'react'
import { TextareaHTMLAttributes } from 'react'
import cn from 'clsx'
import paths from './textarea.shape.svg'
import styles from './Input.module.scss'
import useClipShape from 'hooks/use-clip-shape'

export type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean
}

/**
 * Input element, modified to return string value as
 * the first parameter for onChange listener
 * @param props
 */
export const TextArea = ({ className, invalid, ...props }: InputProps) => (
  useClipShape('textarea', paths),
  (
    <textarea
      rows={5}
      tabIndex={0}
      className={cn(
        'py-10 px-6 outline-none shape-textarea',
        className,
        styles.Input,
        invalid && styles.invalid,
      )}
      {...props}
    />
  )
)
