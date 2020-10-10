import { PageContainer } from 'components/shared/Page'
import { profile } from 'config/routes'
import Button from 'components/shared/Button'
import Input from 'components/form/Input'
import PageTitle from 'components/shared/PageTitle'
import React from 'react'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import useIsGuest from 'hooks/shared/use-is-guest'

export default function Login() {
  if (!useIsGuest(profile())) {
    return null
  }

  return (
    <PageContainer>
      <PageTitle icon={<User />}>Вход</PageTitle>

      <div className={'px-4'}>
        <div className={'mb-1'}>Email</div>
        <Input className={'mb-4'} />
        <div className={'mb-1'}>Пароль</div>
        <Input className={'mb-4'} variant={2} />
        <div className={'text-center'}>
          <Button variant={3} className={'text-center min-w-64'}>
            Продолжить
          </Button>
        </div>

        <div className={'my-16 text-center text-xl'}>ИЛИ</div>

        <SocialLoginButton provider={'google'} className={'mb-2'} />
        <SocialLoginButton provider={'vk'} />
      </div>
    </PageContainer>
  )
}
