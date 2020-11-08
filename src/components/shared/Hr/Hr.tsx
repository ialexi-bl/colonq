import React from 'react'
import cn from 'clsx'
import styles from './Hr.module.scss'

const Hr = ({ variant }: { variant?: 1 | 2 | 3 | 4 }) => (
  <hr className={cn(styles.Hr, variant && styles[`variant-${variant}`])} />
)
export default Hr
