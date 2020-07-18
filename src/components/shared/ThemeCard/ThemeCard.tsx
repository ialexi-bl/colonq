import { Link, LinkProps } from 'react-router-dom'
import React from 'react'
import cn from 'clsx'
import styles from './ThemeCard.module.scss'

export type ThemeCardProps = Childfree<LinkProps> & {
  icon?: React.ReactNode
  label?: string
}

const ThemeCard = ({ icon, label, className, ...props }: ThemeCardProps) => (
  <Link className={cn(className, styles.ThemeCard)} {...props}>
    {icon && <div className={styles.Icon}>{icon}</div>}
    <p className={styles.Label}>{label}</p>
  </Link>
)
export default ThemeCard
