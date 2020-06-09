import React from 'react'
import cn from 'clsx'
import styles from './Page.module.scss'

/**
 * Container of a single page, provides necessary styles
 * @param props
 */
export default React.forwardRef<HTMLDivElement, HTMLProps.div>(
  ({ className, ...props }, ref) => (
    <div className={cn(styles.PageContainer, className)} ref={ref} {...props} />
  ),
)
