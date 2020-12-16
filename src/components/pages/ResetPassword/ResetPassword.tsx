import { Elevation } from 'config/view'
import { RouteComponentProps } from 'config/routes'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import CompoundInput from 'components/shared/CompoundInput'
import LoadingButton from 'components/shared/LoadingButton'
import Page from 'components/shared/Page'
import PageTitle from 'components/shared/PageTitle'
import User from 'components/icons/User'

export default function ResetPassword({ setProgress }: RouteComponentProps) {
  useEffect(() => setProgress(100), [setProgress])

  const formik = useFormik({
    initialValues: { login: '' },
    validate: ({ login }) =>
      login.trim() ? {} : { login: 'Введи имя пользователя или email' },
    onSubmit: ({ login }) => {},
  })

  return (
    <Page routeElevation={Elevation.resetPassword} className={'route-overlay'}>
      <PageTitle icon={<User />}>Восстановление пароля</PageTitle>

      <form onSubmit={formik.handleSubmit}>
        <CompoundInput
          variant={2}
          title={'Имя пользователя или email'}
          props={formik.getFieldProps('login')}
          meta={formik.getFieldMeta('login')}
          name={'login'}
        />
        <LoadingButton
          disabled={Object.keys(formik.errors).length > 0}
          loading={formik.status === 'loading'}
        >
          Продолжить
        </LoadingButton>
      </form>
    </Page>
  )
}
