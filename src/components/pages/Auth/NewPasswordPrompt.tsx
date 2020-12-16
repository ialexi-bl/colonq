import { useFormik } from 'formik'
import CompoundInput from 'components/shared/CompoundInput'
import LoadingButton from 'components/shared/LoadingButton'
import Page from 'components/shared/Page'
import PageTitle from 'components/shared/PageTitle'
import User from 'components/icons/User'
import Validate from 'services/validation'

type FormValues = {
  password: string
  passwordRepeat: string
}

export default function NewPasswordPrompt({
  submit,
}: {
  submit: (password: string) => Promise<boolean>
}) {
  const formik = useFormik<FormValues>({
    initialValues: { password: '', passwordRepeat: '' },
    onSubmit: ({ password }) => {
      formik.setStatus('loading')
      submit(password).then(() => formik.setStatus(null))
    },
    validate,
  })

  const loading = formik.status === 'loading'
  return (
    <Page className={'px-4'}>
      <PageTitle icon={<User />}>Изменение пароля</PageTitle>
      <form onSubmit={formik.handleSubmit}>
        <CompoundInput
          name={'password'}
          type={'password'}
          meta={formik.getFieldMeta('password')}
          props={formik.getFieldProps('password')}
          title={'Новый пароль'}
          variant={2}
        />
        <CompoundInput
          name={'passwordRepeat'}
          type={'passwordRepeat'}
          meta={formik.getFieldMeta('passwordRepeat')}
          props={formik.getFieldProps('passwordRepeat')}
          title={'Повтори пароль'}
          variant={3}
        />
        <LoadingButton
          disabled={Object.keys(formik.errors).length > 0}
          loading={loading}
          variant={3}
          type={'submit'}
        >
          Продолжить
        </LoadingButton>
      </form>
    </Page>
  )
}

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {}

  const vpassword = Validate.password(values.password)
  if (vpassword) errors.password = vpassword

  if (!values.passwordRepeat) {
    errors.passwordRepeat = 'Нужно подтвердить пароль'
  } else if (values.passwordRepeat !== values.password) {
    errors.passwordRepeat = 'Пароли не совпадают'
  }

  return errors
}
