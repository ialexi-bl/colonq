import React, { forwardRef } from 'react'
import cn from 'clsx'
import styles from './Button.module.scss'

export const cleanButton = styles.CleanButton

/**
 * Button without native browser styles
 * @param props
 */
export const CleanButton = forwardRef<HTMLButtonElement, HTMLProps.button>(
  ({ className, ...props }, ref) => (
    <button
      className={cn(styles.CleanButton, className)}
      ref={ref}
      {...props}
    />
  ),
)
