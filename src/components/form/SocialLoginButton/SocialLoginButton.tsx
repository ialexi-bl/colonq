import { AuthProvider, Endpoints } from 'config/endpoints'
import { noop } from 'lodash'
import Google from 'components/icons/social/Google'
import React from 'react'
import Vk from 'components/icons/social/Vk'
import cn from 'clsx'
import paths from 'shapes/button.shape.svg'
import styles from './SocialLoginButton.module.scss'
import useClipShape from 'hooks/shared/use-svg-texture'

export type SocialLoginButtonProps = Omit<HTMLProps.a, 'href'> & {
  provider: AuthProvider
  disabled?: boolean
  link?: boolean
}

/**
 * Button with social network symbols and labels
 * @param {SocialLoginButtonProps} props
 */
export default function SocialLoginButton({
  className,
  provider,
  disabled,
  onClick,
  link,
  ...props
}: SocialLoginButtonProps) {
  useClipShape('button', paths)
  const Icon = icons[provider]

  return (
    <a
      onClick={disabled ? noop : onClick}
      className={cn(
        'reset-link flex items-center duration-100 text-lg py-4 px-6 max-w-sm outline-none',
        disabled ? 'bg-disabled-200 cursor-default' : styles[provider],
        styles.SocialButton,
        className,
      )}
      href={Endpoints.OAuth[provider]}
      {...props}
    >
      <Icon className={'w-6 h-6 mr-2'} />
      {link ? 'Связать с' : 'Войти через'} {labels[provider]}
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
