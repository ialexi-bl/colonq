import { AppState } from 'store/types'
import { ScrollablePage } from 'components/shared/Page'
import { User as UserType, unauthenticate } from 'store/user'
import { notifyInfo } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import { useUserService } from 'services/user-service'
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
  const { username: name, email, providers } = useSelector(
    (state: AppState) => state.user,
  ) as UserType
  const userService = useUserService()

  const logout = () => {
    dispatch(unauthenticate())
    dispatch(notifyInfo(LangNotifications.logout))
    userService.logout()
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
