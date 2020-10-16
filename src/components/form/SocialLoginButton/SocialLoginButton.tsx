import Config from 'config'
import Endpoint from 'config/endpoint'
import Google from 'components/icons/social/Google'
import React from 'react'
import Vk from 'components/icons/social/Vk'
import cn from 'clsx'
import paths from 'components/shared/Button/button.shape.svg'
import styles from './SocialLoginButton.module.scss'
import useClipShape from 'hooks/shared/use-clip-shape'

export type SocialLoginButtonProps = Omit<HTMLProps.a, 'href'> & {
  provider: Config.SupportedProvider
  disabled?: boolean
  type: 'login' | 'register' | 'link'
}

const noop = () => {}
const endpoint = {
  login: {
    vk: Endpoint.auth.loginVk,
    google: Endpoint.auth.loginGoogle,
  },
  register: {
    vk: Endpoint.auth.registerVk,
    google: Endpoint.auth.registerGoogle,
  },
  link: {
    vk: Endpoint.auth.linkVk,
    google: Endpoint.auth.linkGoogle,
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
      onClick={disabled ? noop : onClick}
      className={cn(
        'reset-link flex items-center duration-100 text-lg py-4 px-6 max-w-sm outline-none',
        disabled ? 'bg-disabled-200 cursor-default' : styles[provider],
        styles.SocialButton,
        className,
      )}
      href={endpoint[type][provider]}
      {...props}
    >
      <Icon className={'w-6 h-6 mr-2'} />
      {
        {
          login: 'Войти через',
          register: 'Зарегистрироваться с',
          link: 'Связать с',
        }[type]
      }
      {labels[provider]}
    </a>
  )
}

const icons: Record<
  Config.SupportedProvider,
  React.ComponentType<{ className?: string }>
> = {
  vk: Vk,
  google: Google,
}
const labels: Record<Config.SupportedProvider, string> = {
  vk: 'ВКонтакте',
  google: 'Google',
}
