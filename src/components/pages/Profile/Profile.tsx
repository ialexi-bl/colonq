import { AppState } from 'store/types'
import { Elevation } from 'config/view'
import { RouteComponentProps } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { UserApi } from 'services/api'
import { User as UserType, unauthenticate } from 'store/user'
import { notifyInfo } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import { useSameElevationClassnames } from 'hooks/use-elevation'
import Button from 'components/shared/Button'
import InfoItem from 'components/shared/InfoItem'
import LangNotifications from 'lang/notifications.json'
import PageTitle from 'components/shared/PageTitle'
import { useEffect } from 'react';
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import useIsAuthenticated from 'hooks/use-is-authenticated'

export default function Profile({ setProgress }: RouteComponentProps) {
  const dispatch = useDispatch()
  const { username: name, email, providers } = useSelector(
    (state: AppState) => state.user,
  ) as UserType

  const logout = () => {
    dispatch(unauthenticate())
    dispatch(notifyInfo(LangNotifications.logout))
    UserApi.logout()
  }

  useEffect(() => {
    setProgress(100)
  }, [setProgress])

  const className = useSameElevationClassnames(
    Elevation.profile,
    'route-enter-right',
    'route-exit-right',
  )
  if (!useIsAuthenticated()) return null

  return (
    <ScrollablePage routeElevation={Elevation.profile} className={className}>
      <PageTitle icon={<User />}>Профиль</PageTitle>
      <div className={'px-4'}>
        <InfoItem className={'mb-4'} label={'Имя пользователя'} value={name} />
        <InfoItem className={'mb-12'} label={'Email'} value={email} />
        <p className={'mb-6'}>
          Свяжи аккаунт с другими социальными сетями, если ты хочешь выполнять
          через них вход
        </p>
        <div className={'flex flex-col items-center'}>
          <SocialLoginButton
            type={'link'}
            className={'mb-3 max-w-xs w-full'}
            provider={'vk'}
            disabled={providers.includes('vk')}
          />
          <SocialLoginButton
            type={'link'}
            className={'mb-3 max-w-xs w-full'}
            provider={'google'}
            disabled={providers.includes('google')}
          />
          <Button
            className={'mt-6 w-64 text-lg self-end'}
            onClick={logout}
            secondary
          >
            Выход
          </Button>
        </div>
      </div>
    </ScrollablePage>
  )
}
