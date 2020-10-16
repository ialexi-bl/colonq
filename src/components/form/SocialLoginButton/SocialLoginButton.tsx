import { noop } from 'lodash'
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
      href={Endpoint.oauth[provider]}
      {...props}
    >
      <Icon className={'w-6 h-6 mr-2'} />
      {link ? 'Связать с' : 'Войти через'} {labels[provider]}
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
