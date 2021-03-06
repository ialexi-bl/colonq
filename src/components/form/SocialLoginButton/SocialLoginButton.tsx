import * as React from 'react'
import { SupportedProvider } from 'config'
import Endpoint from 'core/api/config/endpoints'
import Google from 'components/icons/social/Google'
import Vk from 'components/icons/social/Vk'
import cn from 'clsx'
import paths from 'components/shared/Button/button.shape.svg'
import styles from './SocialLoginButton.module.scss'
import useClipShape from 'hooks/use-clip-shape'

export type SocialLoginButtonProps = Omit<HTMLProps.a, 'href'> & {
  provider: SupportedProvider
  disabled?: boolean
  type: 'login' | 'register' | 'link' | 'editPassword'
}

const endpoints = {
  login: {
    vk: Endpoint.oauth.loginVk,
    google: Endpoint.oauth.loginGoogle,
  },
  register: {
    vk: Endpoint.oauth.registerVk,
    google: Endpoint.oauth.registerGoogle,
  },
  link: {
    vk: Endpoint.oauth.linkVk,
    google: Endpoint.oauth.linkGoogle,
  },
  editPassword: {
    vk: Endpoint.oauth.editPasswordVk,
    google: Endpoint.oauth.editPasswordGoogle,
  },
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
  type,
  ...props
}: SocialLoginButtonProps) {
  useClipShape('button', paths)
  const Icon = icons[provider]

  return (
    <a
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onClick}
      className={cn(
        'reset-link flex items-center duration-100 text-lg py-4 px-6 outline-none',
        disabled ? 'bg-disabled-700 cursor-default' : styles[provider],
        styles.SocialButton,
        className,
      )}
      href={endpoints[type][provider]}
      {...props}
    >
      <Icon className={'w-6 h-6 mr-2'} />
      {{
        link: 'Связать с',
        login: 'Войти через',
        register: 'Зарегистрироваться с',
        editPassword: 'Изменить пароль с',
      }[type] + ' '}
      {labels[provider]}
    </a>
  )
}

const icons: Record<
  SupportedProvider,
  React.ComponentType<{ className?: string }>
> = {
  vk: Vk,
  google: Google,
}
const labels: Record<SupportedProvider, string> = {
  vk: 'ВКонтакте',
  google: 'Google',
}
