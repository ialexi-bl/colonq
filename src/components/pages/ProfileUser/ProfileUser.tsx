import { AppState } from 'store/types'
import { Endpoints } from 'config/endpoints'
import { ScrollablePage } from 'components/shared/Page'
import { notifyInfo } from 'store/view'
import { unauthenticate } from 'store/auth'
import { useDispatch, useSelector } from 'react-redux'
import ApiClient from 'services/client'
import Button from 'components/shared/Button'
import InfoItem from 'components/shared/InfoItem'
import LangNotifications from 'lang/notifications.json'
import PageTitle from 'components/shared/PageTitle'
import React from 'react'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import useIsAuthenticated from 'hooks/shared/use-is-authenticated'

export default function ProfileUser() {
  const dispatch = useDispatch()
  const { name, email, providers } = useSelector(
    (state: AppState) => state.auth,
  )
  const logout = () => {
    ApiClient.check = null
    dispatch(unauthenticate())
    dispatch(notifyInfo(LangNotifications.logout))

    ApiClient.post(Endpoints.Auth.logout, {
      mode: 'cors',
      credentials: 'include',
      authenticate: true,
    }).catch(() => {
      // TODO: probably add error logging although the only error
      // that can happen here is network problem
    })
  }

  if (!useIsAuthenticated()) {
    return null
  }

  return (
    <ScrollablePage>
      <PageTitle icon={<User />}>Профиль</PageTitle>
      <div className={'px-4'}>
        <InfoItem className={'mb-4'} label={'Имя'} value={name} />
        <InfoItem className={'mb-12'} label={'Email'} value={email} />
        <p className={'mb-6'}>
          Свяжи аккаунт с другими социальными сетями, если ты хочешь выполнять
          через них вход или если у тебя уже есть аккаунт ColonQ, связанный с
          другой сетью
        </p>
        <div className={'flex flex-col items-end'}>
          <SocialLoginButton
            className={'mb-3'}
            provider={'vk'}
            disabled={providers.includes('vk')}
            link
          />
          <SocialLoginButton
            className={'mb-3'}
            provider={'google'}
            disabled={providers.includes('google')}
            link
          />
          <Button className={'w-64 mt-4'} onClick={logout} secondary>
            Выход
          </Button>
        </div>
      </div>
    </ScrollablePage>
  )
}
