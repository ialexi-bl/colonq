import { Endpoints } from 'config/endpoints'
import { PageContainer } from 'components/shared/Page'
import { profile } from 'config/routes'
import PageTitle from 'components/shared/PageTitle'
import React from 'react'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import useIsGuest from 'hooks/shared/use-is-guest'

export default function ProfileGuest() {
  if (!useIsGuest(profile())) {
    return null
  }

  return (
    <PageContainer>
      <PageTitle icon={<User />} label={'Профиль'} />
      <div className={'px-4'}>
        <p className={'mb-4'}>
          Войди, чтобы начать занятия, вести статистику, сохранять прогресс и
          синхронизировать настройки между устройствами
        </p>
        <div className={'d-flex flex-column align-items-center'}>
          <SocialLoginButton
            className={'mb-3'}
            provider={'vk'}
            href={Endpoints.OAuth.vk}
          />
          <SocialLoginButton
            className={'mb-3'}
            provider={'google'}
            href={Endpoints.OAuth.google}
          />
        </div>
      </div>
    </PageContainer>
  )
}
