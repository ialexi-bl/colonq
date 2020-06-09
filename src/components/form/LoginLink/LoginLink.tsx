import { AuthProvider } from 'config/endpoints'
import { Google } from 'components/icons/Google'
import { Vk } from 'components/icons/Vk'
import React, { AnchorHTMLAttributes } from 'react'
import cn from 'clsx'
import styles from './LoginLink.module.scss'

export type LoginLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  provider: AuthProvider
  disabled?: boolean
}

const icons: Record<
  AuthProvider,
  React.ComponentType<{ className?: string }>
> = {
  vk: Vk,
  google: Google,
}
const labels: Record<AuthProvider, string> = {
  vk: 'ВКонтакте',
  google: 'Google',
}

const disable = (e: React.SyntheticEvent) => e.preventDefault()

/**
 * Button with social network symbols and labels
 * @param props
 */
export const LoginLink = ({
  provider,
  className,
  disabled,
  onClick,
  ...props
}: LoginLinkProps) => {
  const Icon = icons[provider]

  return (
    <a
      onClick={disabled ? disable : onClick}
      className={cn(
        disabled ? styles.disabled : styles[provider],
        styles.LoginButton,
        className,
      )}
      {...props}
    >
      <Icon className={styles.LoginIcon} />
      {labels[provider]}
    </a>
  )
}
