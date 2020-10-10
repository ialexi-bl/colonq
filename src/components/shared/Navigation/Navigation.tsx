import { AppState } from 'store/types'
import { Link } from 'react-router-dom'
import { index, profile } from 'config/routes'
import { useSelector } from 'react-redux'
import InteractiveLogo from '../InteractiveLogo'
import React from 'react'
import User from 'components/icons/User'
import cn from 'clsx'
import styles from './Navigation.module.scss'

export default function Navigation() {
  const visible = useSelector((state: AppState) => state.view.navigationVisible)

  return (
    <div className={cn(styles.Navigation, !visible && styles.hidden)}>
      <Link to={index()} className={styles.Button}>
        <InteractiveLogo />
      </Link>
      <Link to={profile()} className={styles.Button}>
        <User />
      </Link>
    </div>
  )
}
