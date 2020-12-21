import { useFormik } from 'formik'
import CompoundInput from 'components/shared/CompoundInput'
import LoadingButton from 'components/shared/LoadingButton'
import Validate from 'services/validation'

type FormValues = {
  newPassword: string
  newPasswordRepeat: string
  currentPassword: string
}
export default function PasswordForm() {
  const formik = useFormik<FormValues>({
    initialValues: {
      newPassword: '',
      newPasswordRepeat: '',
      currentPassword: '',
    },
    validate: ({ newPassword, newPasswordRepeat, currentPassword }) => {
      const errors: Partial<FormValues> = {}

      if (!currentPassword) {
        errors.currentPassword = 'Введи текущий пароль'
      }

      const vpassword = Validate.password(newPassword)
      if (vpassword) errors.newPassword = vpassword

      if (!newPasswordRepeat) {
        errors.newPasswordRepeat = 'Введи подтверждение пароля'
      } else if (newPasswordRepeat !== newPassword) {
        errors.newPasswordRepeat = 'Пароли не совпадают'
      }
      return errors
    },
    onSubmit: () => {},
  })

  const loading = formik.status === 'loading'
  return (
    <form onSubmit={formik.handleSubmit}>
      <CompoundInput
        type={'password'}
        meta={formik.getFieldMeta('currentPassword')}
        props={formik.getFieldProps('currentPassword')}
        label={'Текущий пароль'}
        loading={loading}
      />
      <CompoundInput
        type={'password'}
        meta={formik.getFieldMeta('newPassword')}
        props={formik.getFieldProps('newPassword')}
        label={'Новый пароль'}
        loading={loading}
        variant={3}
      />
      <CompoundInput
        type={'password'}
        meta={formik.getFieldMeta('newPasswordRepeat')}
        props={formik.getFieldProps('newPasswordRepeat')}
        label={'Повтори новый пароль'}
        loading={loading}
        variant={2}
      />
      <LoadingButton
        disabled={Object.keys(formik.errors).length > 0}
        loading={loading}
        type={'submit'}
      >
        Продолжить
      </LoadingButton>
    </form>
  )
}
