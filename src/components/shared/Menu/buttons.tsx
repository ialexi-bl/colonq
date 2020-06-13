import { CleanButton } from '../Button'
import { Hamburger } from 'components/icons/Hamburger'
import { InteractiveLogo } from '../InteractiveLogo'
import { Link } from 'react-router-dom'
import { Signin } from 'components/icons/Signin'
import { User } from 'components/icons/User'
import { index, profile, signin } from 'config/routes'
import { toggleNav } from 'store/view'
import React from 'react'
import cn from 'clsx'
import styles from './Overlay.module.scss'

export const LogoLink = () => (
  <Link to={index()} className={cn(styles.Button, styles.ButtonLogo)}>
    <InteractiveLogo className={styles.Logo} />
  </Link>
)

export const NavButton = (props: { onClick?: HTMLProps.button['onClick'] }) => (
  <CleanButton className={cn(styles.Button, styles.ButtonNav)} {...props}>
    <Hamburger className={styles.Icon} />
  </CleanButton>
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
    {authenticated ? (
      <User className={styles.Icon} />
    ) : (
      <Signin className={styles.Icon} />
    )}
  </Link>
)
