import { AuthProvider } from 'config/endpoints'
import { Google } from 'components/icons/Google'
import { Vk } from 'components/icons/Vk'
import { noop } from 'lodash'
import React from 'react'
import cn from 'clsx'
import styles from './SocialLoginButton.module.scss'

export type SocialLoginButtonProps = HTMLProps.a & {
  provider: AuthProvider
  disabled?: boolean
}

/**
 * Button with social network symbols and labels
 * @param {SocialLoginButtonProps} props
 */
export default function SocialLoginButton({
  provider,
  className,
  disabled,
  onClick,
  ...props
}: SocialLoginButtonProps) {
  const Icon = icons[provider]

  return (
    <a
      onClick={disabled ? noop : onClick}
      className={cn(
        disabled ? styles.disabled : styles[provider],
        styles.SocialLoginButton,
        className,
      )}
      {...props}
    >
      <Icon className={styles.Icon} />
      {labels[provider]}
    </a>
  )
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
