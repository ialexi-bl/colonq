import { Elevation } from 'config/view'
import { LinkButton } from 'components/shared/Button'
import { RouteComponentProps, login } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import PageTitle from 'components/shared/PageTitle'
import React, { useEffect, useState } from 'react'
import RegistrationForm from './RegistrationForm'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import useIsGuest from 'hooks/use-is-guest'

export default function Registration({ setProgress }: RouteComponentProps) {
  useEffect(() => setProgress(100), [setProgress])
  const [loading, setLoading] = useState(false)

  if (!useIsGuest()) return null
  return (
    <ScrollablePage
      routeElevation={Elevation.registration}
      className={'bg-route route-right'}
    >
      <PageTitle icon={<User />}>Регистрация</PageTitle>

      <div className={'max-w-xl mx-auto px-4 pb-64'}>
        <RegistrationForm setLoading={setLoading} />

        <div className={'my-16 text-center text-xl'}>ИЛИ</div>

        <div className={'flex flex-col items-center'}>
          <SocialLoginButton
            type={'register'}
            disabled={loading}
            provider={'google'}
            className={'mb-2 max-w-sm w-full'}
          />
          <SocialLoginButton
            type={'register'}
            disabled={loading}
            provider={'vk'}
            className={'mb-2 max-w-sm w-full'}
          />
          <LinkButton
            className={'mb-2 block text-lg max-w-sm w-full'}
            to={login()}
            secondary
          >
            Войти
          </LinkButton>
        </div>
      </div>
    </ScrollablePage>
  )
}
