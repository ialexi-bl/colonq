import { Link } from 'react-router-dom'
import { index, profile, signin } from 'config/routes'
import Hamburger from 'components/icons/Hamburger'
import InteractiveLogo from '../InteractiveLogo'
import React from 'react'
import User from 'components/icons/User'
import cn from 'clsx'
import styles from './Menu.module.scss'

export const LogoLink = () => (
  <Link to={index()} className={cn(styles.Button, styles.ButtonLogo)}>
    <InteractiveLogo className={styles.Logo} />
  </Link>
)

export const NavButton = (props: { onClick?: HTMLProps.button['onClick'] }) => (
  <button className={cn(styles.Button, styles.ButtonNav)} {...props}>
    <Hamburger className={styles.Icon} />
  </button>
)

export const ProfileButton = ({
  authenticated,
  loading,
}: {
  authenticated: boolean
  loading?: boolean
}) => (
  <Link
    to={authenticated ? profile() : signin()}
    className={cn(styles.Button, styles.ButtonUser, {
      [styles.Active]: !loading,
    })}
  >
    <User className={styles.Icon} />
  </Link>
)
