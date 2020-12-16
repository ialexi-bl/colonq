import { AppState } from 'store/types'
import { Elevation } from 'config/view'
import { RouteComponentProps, editPassword } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { UserApi } from 'services/api'
import { User as UserType, unauthenticate } from 'store/user'
import { notifyInfo } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useElevationClassnames } from 'hooks/use-elevation'
import Button from 'components/shared/Button'
import Edit from 'components/icons/Edit'
import FieldEditor from './FieldEditor'
import InfoItem from 'components/shared/InfoItem'
import LangNotifications from 'lang/notifications.json'
import PageTitle from 'components/shared/PageTitle'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import Validate from 'services/validation'
import cn from 'clsx'
import useIsAuthenticated from 'hooks/use-is-authenticated'

export const NO_LOADING_REQUIRED = true
export default function Profile({ setProgress }: RouteComponentProps) {
  useEffect(() => setProgress(100), [setProgress])
  const dispatch = useDispatch()
  const { username, email, providers } = useSelector(
    (state: AppState) => state.user,
  ) as UserType

  const logout = () => {
    dispatch(unauthenticate())
    dispatch(notifyInfo(LangNotifications.logout))
    UserApi.logout()
  }

  const className = useElevationClassnames(Elevation.profile, {
    same: 'right',
  })
  if (!useIsAuthenticated()) return null

  return (
    <ScrollablePage
      routeElevation={Elevation.profile}
      className={cn('bg-page', className)}
    >
      <PageTitle icon={<User />}>Профиль</PageTitle>
      <div className={'px-4'}>
        <section className={'mb-8'}>
          <InfoItem className={'mb-4'} label={'Имя пользователя'}>
            <FieldEditor
              message={'Имя пользователя изменено'}
              method={UserApi.setUsername}
              validate={Validate.username}
              defaultValue={username}
            />
          </InfoItem>
          <InfoItem className={'mb-4'} label={'Email'}>
            <FieldEditor
              email
              method={UserApi.requestChangeEmail}
              validate={Validate.username}
              defaultValue={email}
            />
          </InfoItem>
          <InfoItem className={'mb-4'} label={'Пароль'}>
            <div className={'flex py-2'}>
              <div className={'flex-1'}>********</div>
              <button
                className={'ml-2 w-6 focus:text-gray-600'}
                onClick={() => dispatch(push(editPassword()))}
              >
                <Edit />
              </button>
            </div>
          </InfoItem>
        </section>
        <section>
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
        </section>
      </div>
    </ScrollablePage>
  )
}
