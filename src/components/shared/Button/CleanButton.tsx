import React, { forwardRef } from 'react'
import cn from 'clsx'
import styles from './Button.module.scss'

export const cleanButton = styles.CleanButton

/**
 * Button without native browser styles
 * @param props
 */
export const CleanButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      className={cn(styles.CleanButton, className)}
      ref={ref}
      {...props}
    />
  ),
)
