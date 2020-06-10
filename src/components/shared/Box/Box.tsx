import React from 'react'
import cn from 'clsx'
import styles from './Box.module.scss'

export function Box({ className, ...props }: HTMLProps.div) {
  return <div className={cn(styles.Box, className)} {...props} />
}
