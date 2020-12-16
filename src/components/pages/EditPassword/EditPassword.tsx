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
import User from 'components/icons/User'
import useElevation from 'hooks/use-elevation'
import useIsAuthenticated from 'hooks/use-is-authenticated'
import useWasTrue from 'hooks/use-was-true'

type UpdateOptions = ApiResponse.User.PasswordUpdateOption[] | false | null
export default function EditPassword({ setProgress }: RouteComponentProps) {
  const dispatch = useDispatch<MixedDispatch>()
  const [updateOptions, setUpdateOptions] = useState<UpdateOptions>(null)
  const hadError = useWasTrue(updateOptions === false)

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
  if (!useIsAuthenticated()) return null

  if (updateOptions === false || (!updateOptions && hadError)) {
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

  return <Wrapper></Wrapper>
}

const Wrapper = ({ children }: BasicProps) => (
  <Page
    routeElevation={Elevation.editUserData}
    className={'bg-page route-overlay'}
  >
    <PageTitle icon={<User />}>Изменение пароля</PageTitle>
    {children}
  </Page>
)
