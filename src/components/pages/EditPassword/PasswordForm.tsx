import { useFormik } from 'formik'
import Validate from 'services/validation'

type FormValues = {
  newPassword: string
  newPasswordRepeat: string
  currentPassword: string
}
// export type PasswordFormProps = {

// }
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
    },
    onSubmit: () => {},
  })

  return <form onSubmit={formik.handleSubmit}></form>
}
