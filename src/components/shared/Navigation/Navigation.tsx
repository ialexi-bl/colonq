import { CleanButton } from '../Button'
import { Link } from 'react-router-dom'
import { list, profile, settings } from 'config/routes'
import List from 'components/icons/List'
import React from 'react'
import Settings from 'components/icons/Settings'
import User from 'components/icons/User'
import styles from './Navigation.module.scss'

const Navigation = () => (
  <div className={styles.Navigation}>
    <Link to={list()} className={styles.Button}>
      <List />
    </Link>
    <Link to={profile()} className={styles.Button}>
      <User />
    </Link>
    <Link to={settings()} className={styles.Button}>
      <Settings />
    </Link>
  </div>
)
export default Navigation
