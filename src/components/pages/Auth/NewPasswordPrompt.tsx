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
      submit(password).then((success) =>
        formik.setStatus(success ? 'success' : null),
      )
    },
    validate,
  })

  const loading = formik.status === 'loading'
  return (
    <Page>
      <PageTitle icon={<User />}>Изменение пароля</PageTitle>
      <form className={'px-4'} onSubmit={formik.handleSubmit}>
        <CompoundInput
          type={'password'}
          meta={formik.getFieldMeta('password')}
          props={formik.getFieldProps('password')}
          label={'Новый пароль'}
          variant={2}
        />
        <CompoundInput
          type={'password'}
          meta={formik.getFieldMeta('passwordRepeat')}
          props={formik.getFieldProps('passwordRepeat')}
          label={'Повтори пароль'}
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
