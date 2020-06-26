import React from 'react'
import cn from 'clsx'
import styles from './CenteredBox.module.scss'

const CenteredBox = ({ className, ...props }: HTMLProps.div) => (
  <div className={cn(styles.CenteredBox, className)} {...props} />
)
export default CenteredBox
