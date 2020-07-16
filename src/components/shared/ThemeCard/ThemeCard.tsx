import React from 'react'
import cn from 'clsx'
import styles from './ThemeCard.module.scss'

export type ThemeCardProps = Childfree<HTMLProps.a> & {
  icon?: React.ReactNode
  label?: string
}

const ThemeCard = ({ icon, label, className, ...props }: ThemeCardProps) => (
  <a className={cn(className, styles.ThemeCard)} {...props}>
    <div className={styles.Icon}>{icon}</div>
    <p className={styles.Label}>{label}</p>
  </a>
)
export default ThemeCard
