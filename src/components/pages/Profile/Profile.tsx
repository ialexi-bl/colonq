import { AppState } from 'store/types'
import { Elevation } from 'config/view'
import { Helmet } from 'react-helmet'
import { Logout, Section } from './view'
import { RouteComponentProps, editPassword } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { User as UserType } from 'store/user'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useElevationClassnames } from 'hooks/use-elevation'
import Edit from 'components/icons/Edit'
import FieldEditor from './FieldEditor'
import InfoItem from 'components/shared/InfoItem'
import PageTitle from 'components/shared/PageTitle'
import Separator from './Separator'
import Settings from './Settings'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import UserService from 'core/api/services/user'
import Validate from 'core/validation'
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
          className={
            'sm:px-12 pb-64 flex flex-col transform-gpu items-center md:flex-row'
          }
        >
          <div
            className={
              'flex-1 lg:flex-2 flex flex-col md:ml-auto md:max-w-md lg:max-w-lg'
            }
          >
            <Section className={hasUnlinked ? 'md:flex-1' : ''}>
              <InfoItem className={'mb-4'} label={'Имя пользователя'}>
                <FieldEditor
                  message={'Имя пользователя изменено'}
                  method={UserService.setUsername}
                  validate={Validate.username}
                  defaultValue={username}
                />
              </InfoItem>
              <InfoItem className={'mb-4'} label={'Email'}>
                <FieldEditor
                  email
                  method={UserService.requestChangeEmail}
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
              <Logout />
            </Section>

            {hasUnlinked && (
              <>
                <Separator className={'h-px w-72 self-center'} />

                <Section
                  className={
                    'md:flex-1 flex flex-col items-center md:items-start'
                  }
                >
                  <p className={'self-start mb-6 max-w-sm'}>
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
                </Section>
              </>
            )}
          </div>

          <Separator className={'h-px w-72 md:hidden'} />

          <Section
            className={'flex-1 md:mr-auto md:max-w-md self-stretch lg:max-w-lg'}
          >
            <Settings />
          </Section>
        </div>
      </div>
    </ScrollablePage>
  )
}
