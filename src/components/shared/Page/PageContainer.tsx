import React from 'react'
import cn from 'clsx'
import styles from './Page.module.scss'

/**
 * Container of a single page, provides necessary styles
 * @param props
 */
export const PageContainer = ({ className, ...props }: HTMLProps.div) => (
  <div
    className={cn('container', styles.PageContainer, className)}
    {...props}
  />
)
