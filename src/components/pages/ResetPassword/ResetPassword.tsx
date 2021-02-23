import { Elevation } from 'config/view'
import { Helmet } from 'react-helmet'
import { HttpError } from 'core/errors'
import { RouteComponentProps } from 'config/routes'
import { notifyErrorObject } from 'store/view'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import AuthService from 'core/api/services/auth'
import CompoundInput from 'components/shared/CompoundInput'
import LoadingButton from 'components/shared/LoadingButton'
import Page from 'components/shared/Page'
import PageTitle from 'components/shared/PageTitle'
import Slider from 'components/shared/Slider/Slider'
import useElevation from 'hooks/use-elevation'

export default function ResetPassword({ setProgress }: RouteComponentProps) {
  const dispatch = useDispatch()
  useEffect(() => setProgress(100), [setProgress])

  useElevation(Elevation.resetPassword)
  const formik = useFormik({
    initialValues: { login: '' },
    validate: ({ login }) =>
      login.trim() ? {} : { login: 'Введи имя пользователя или email' },
    onSubmit: async ({ login }) => {
      formik.setStatus('loading')
      AuthService.requestResetPassword(login)
        .then(() => {
          formik.setStatus('success')
        })
        .catch((e) => {
          if (e instanceof HttpError && e.status === 404) {
            formik.setFieldError('login', 'Нет пользователя с такими данными')
          } else {
            dispatch(notifyErrorObject(e))
          }
          formik.setStatus(null)
        })
    },
  })

  return (
    <Page
      routeElevation={Elevation.resetPassword}
      className={'bg-page route-overlay'}
    >
      <Helmet>Восстановление пароля</Helmet>
      <PageTitle>Восстановление пароля</PageTitle>

      <Slider
        active={formik.status === 'success'}
        className={'px-4'}
        defaultView={
          <form onSubmit={formik.handleSubmit}>
            <CompoundInput
              variant={2}
              label={'Имя пользователя или email'}
              props={formik.getFieldProps('login')}
              meta={formik.getFieldMeta('login')}
            />
            <LoadingButton
              disabled={Object.keys(formik.errors).length > 0}
              loading={formik.status === 'loading'}
            >
              Продолжить
            </LoadingButton>
          </form>
        }
        extraView={
          <p>
            Если аккаунт с таким именем пользователя или электронным адресом
            существует, на привязанный к нему email должно прийти письмо с
            ссылкой для подтверждения. Перейди по ней, чтобы сменить пароль.
          </p>
        }
      />
    </Page>
  )
}
