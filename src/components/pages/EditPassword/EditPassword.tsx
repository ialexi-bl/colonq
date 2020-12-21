import { ApiResponse } from 'services/api/config'
import { Elevation } from 'config/view'
import { MixedDispatch } from 'store/types'
import { RouteComponentProps } from 'config/routes'
import { UserApi } from 'services/api'
import { executeAuthorizedMethod } from 'store/user'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Button from 'components/shared/Button'
import LoadingError from 'components/shared/LoadingError'
import Page from 'components/shared/Page'
import PageTitle from 'components/shared/PageTitle'
import PasswordForm from './PasswordForm'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import useElevation from 'hooks/use-elevation'
import useIsAuthenticated from 'hooks/use-is-authenticated'

type UpdateOptions = ApiResponse.User.PasswordUpdateOption[] | false | null
export default function EditPassword({
  setProgress,
  visible,
}: RouteComponentProps) {
  const dispatch = useDispatch<MixedDispatch>()
  const [updateOptions, setUpdateOptions] = useState<UpdateOptions>(null)

  const load = () => {
    setUpdateOptions(null)
    dispatch(executeAuthorizedMethod(UserApi.getPasswordUpdateOptions()))
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
      {hasPassword && <PasswordForm />}
      {hasSocial && <div className={'my-16 text-center text-xl'}>ИЛИ</div>}
      {hasSocial && !hasPassword && (
        <p>
          Твой профиль был зарегистирирован с помощью социальной сети, поэтому у
          него нет пароля. Если ты хочешь установить его, войди с её помощью ещё
          раз, после чего появится поле для его установки:
        </p>
      )}
      {hasSocial && hasPassword && (
        <p>
          Можно войти с помощью социальной сети, после чего ты увидишь поле для
          изменения пароля
        </p>
      )}
      {hasSocial && (
        <>
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
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = ({ children }: BasicProps) => (
  <Page
    routeElevation={Elevation.editUserData}
    className={'bg-page route-overlay'}
  >
    <PageTitle icon={<User />}>Изменение пароля</PageTitle>
    <div className={'px-4'}>{children}</div>
  </Page>
)
