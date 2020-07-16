import { CleanButton } from '../Button'
import { list, profile, settings } from 'config/routes'
import List from 'components/icons/List'
import React from 'react'
import Settings from 'components/icons/Settings'
import User from 'components/icons/User'
import styles from './Navigation.module.scss'

const Navigation = () => (
  <div className={styles.Navigation}>
    <a href={list()} className={styles.Button}>
      <List />
    </a>
    <a href={profile()} className={styles.Button}>
      <User />
    </a>
    <a href={settings()} className={styles.Button}>
      <Settings />
    </a>
  </div>
)
export default Navigation
