import React from 'react'
import cn from 'clsx'
import styles from './CenteredBox.module.scss'

export const CenteredBox = ({ className, ...props }: HTMLProps.div) => (
  <div className={cn(styles.CenteredBox, className)} {...props} />
)
