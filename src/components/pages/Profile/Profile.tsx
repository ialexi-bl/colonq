import { AppState } from 'store/types'
import { Elevation } from 'config/view'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, editPassword } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { UserApi } from 'services/api'
import { User as UserType } from 'store/user'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useElevationClassnames } from 'hooks/use-elevation'
import Edit from 'components/icons/Edit'
import FieldEditor from './FieldEditor'
import InfoItem from 'components/shared/InfoItem'
import Logout from './Logout'
import NotificationsToggler from './NotificationsToggler'
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

  const className = useElevationClassnames(Elevation.profile, {
    same: 'right',
  })
  if (!useIsAuthenticated()) return null

  // NOTE: should be changed if providers are added
  const hasUnlinked = providers.length < 2
  return (
    <ScrollablePage
      routeElevation={Elevation.profile}
      className={cn('bg-page', className)}
    >
      <Helmet>
        <title>Профиль</title>
      </Helmet>
      <div className={'container'}>
        <PageTitle icon={<User />}>Профиль</PageTitle>
        <div
          className={cn(
            'sm:px-12 pb-64 mx-auto flex flex-col',
            hasUnlinked ? 'md:flex-row' : 'md:items-center',
          )}
        >
          <section className={cn('mb-16 px-4', hasUnlinked && 'md:flex-1')}>
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
                validate={Validate.emailFormat}
                defaultValue={email}
              />
            </InfoItem>
            <InfoItem className={'mb-4'} label={'Пароль'}>
              <div className={'flex py-2'}>
                <div className={'flex-1 max-w-sm'}>********</div>
                <button
                  className={'ml-2 w-6 focus:text-gray-600'}
                  onClick={() => dispatch(push(editPassword()))}
                >
                  <Edit />
                </button>
              </div>
            </InfoItem>
            {!hasUnlinked && <Logout />}
          </section>
          {hasUnlinked && (
            <>
              {/* Separator between blocks */}
              <div
                className={
                  'hidden md:block w-px h-64 bg-disabled-700 flex-shrink-0'
                }
              />
              <section className={'md:flex-1 px-4'}>
                <NotificationsToggler />
                <div className={'flex flex-col items-center'}>
                  <p className={'mb-6 max-w-sm'}>
                    Свяжи аккаунт с другими социальными сетями, если ты хочешь
                    выполнять через них вход
                  </p>
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
                  <Logout />
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </ScrollablePage>
  )
}
