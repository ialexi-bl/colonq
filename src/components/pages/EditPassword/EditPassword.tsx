import { Api } from 'core/api/config'
import { Elevation } from 'config/view'
import { Helmet } from 'react-helmet'
import { MixedDispatch } from 'store/types'
import { RouteComponentProps } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Button from 'components/shared/Button'
import LoadingError from 'components/shared/LoadingError'
import PageTitle from 'components/shared/PageTitle'
import PasswordForm from './PasswordForm'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import UserService from 'core/api/services/user'
import useElevation from 'hooks/use-elevation'
import useIsAuthenticated from 'hooks/use-is-authenticated'

type UpdateOptions = Api.User.PasswordUpdateOption[] | false | null
export default function EditPassword({
  setProgress,
  visible,
}: RouteComponentProps) {
  const dispatch = useDispatch<MixedDispatch>()
  const [updateOptions, setUpdateOptions] = useState<UpdateOptions>(null)

  const load = () => {
    setUpdateOptions(null)
    UserService.getPasswordUpdateOptions()
      .then(({ data }) => {
        setUpdateOptions(data)
      })
      .catch(() => {
        setUpdateOptions(false)
      })
      .then(() => {
        setProgress(100)
      })
  }
  useEffect(load, [dispatch, setProgress])

  useElevation(Elevation.editUserData)
  if (!useIsAuthenticated() || !visible) return null

  if (!updateOptions) {
    return (
      <Wrapper>
        <Helmet>
          <title>Ошибка - Смена пароля</title>
        </Helmet>
        <LoadingError
          title={'Не удалось загрузить способы изменения пароля'}
          actions={
            <Button
              onClick={load}
              disabled={updateOptions === null}
              className={'min-w-64'}
              variant={2}
            >
              Попробовать ещё раз
            </Button>
          }
        />
      </Wrapper>
    )
  }

  const hasPassword = updateOptions.includes('password')
  const hasSocial = !hasPassword || updateOptions.length > 1
  return (
    <Wrapper>
      <Helmet>
        <title>Смена пароля</title>
      </Helmet>
      <div className={'max-w-xl mx-auto'}>
        {hasPassword && <PasswordForm />}
        {hasSocial && hasPassword && (
          <div className={'my-16 text-center text-xl'}>ИЛИ</div>
        )}
        {hasSocial && !hasPassword && (
          <p className={'mb-4'}>
            Твой профиль был зарегистирирован с помощью социальной сети, поэтому
            у него нет пароля. Если ты хочешь установить его, войди с её помощью
            ещё раз, после чего появится поле, в котором ты сможешь его указать:
          </p>
        )}
        {hasSocial && hasPassword && (
          <p className={'mb-4'}>
            Можно войти с помощью социальной сети, после чего появится поле для
            смены пароля
          </p>
        )}
        {hasSocial && (
          <div className={'flex flex-col items-center'}>
            <SocialLoginButton
              type={'editPassword'}
              provider={'google'}
              className={'mb-2 max-w-sm w-full'}
            />
            <SocialLoginButton
              type={'editPassword'}
              provider={'vk'}
              className={'mb-2 max-w-sm w-full'}
            />
          </div>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = ({ children }: BasicProps) => (
  <ScrollablePage
    routeElevation={Elevation.editUserData}
    className={'bg-page route-overlay'}
  >
    <div className={'container pb-72'}>
      <PageTitle icon={<User />}>Изменение пароля</PageTitle>
      <div className={'px-4'}>{children}</div>
    </div>
  </ScrollablePage>
)
