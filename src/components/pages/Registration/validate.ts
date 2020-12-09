import { UserApi } from 'services/api'
import { dedupe } from 'util/array'
import Regex from 'config/regex'

export type RegistrationFormValues = {
  email: string
  username: string
  password: string
  passwordRepeat: string
}
export type TempValidationData = {
  blur: boolean
  timer: null | number
  email?: string
}

/**
 * Validates inputs for registration form
 * @param values - Form values provided by formik
 * @param temp - Temporary object that persists between validations
 * and keeps some state for email validation (explanation below)
 * @param formik - Formik controls
 */
export default function validate(
  values: RegistrationFormValues,
  temp: TempValidationData,
  formik: any,
) {
  const errors: Partial<RegistrationFormValues> = {}

  // Validating user name
  if (!values.username.trim()) {
    errors.username = 'Введи имя пользователя'
  } else if (values.username.length < 4) {
    errors.username = 'Имя пользователя должно быть не короче 4 символов'
  } else if (values.username.length > 64) {
    errors.username = 'Имя пользователя должно быть не длиннее 64 символов'
  } else if (!Regex.username.test(values.username)) {
    const forbiddenChars = values.username.match(Regex.usernameForbiddenChars)!

    errors.username = `Нельзя использовать символы: ${dedupe(forbiddenChars)
      .map((x) => `"${x}"`)
      .join(', ')}`
  }

  // Validating password
  if (!values.password) {
    errors.password = 'Введи пароль'
  } else if (values.password.length < 8) {
    errors.password = 'Пароль должен быть не короче 8 символов'
  } else if (values.password.length > 128) {
    errors.password = 'Пароль должен быть не длиннее 128 символов'
  }

  // Validating password verification
  if (!values.passwordRepeat) {
    errors.passwordRepeat = 'Нужно подтвердить пароль'
  } else if (values.passwordRepeat !== values.password) {
    errors.passwordRepeat = 'Пароли не совпадают'
  }

  // Validating email - the most complex part
  if (temp.email !== values.email && temp.timer) {
    clearTimeout(temp.timer)
  }

  if (!values.email.trim()) {
    errors.email = 'Email нужен обязательно'
  } else if (!Regex.email.test(values.email)) {
    errors.email = 'Это недействительный email'
  } else if (temp.email !== values.email) {
    const msg = 'Этот email уже занят'
    const occupied = UserApi.isEmailOccupiedCache(values.email)

    if (occupied === null) {
      errors.email = 'pending'
      temp.timer = window.setTimeout(
        () => {
          // TODO: maybe also see 400 errors returned from server as validation fail
          UserApi.isEmailOccupied(values.email).then((occupied) => {
            if (temp.email !== values.email) return

            temp.timer = null
            if (occupied === null) {
              return formik.setFieldError('email', {
                type: 'warning',
                text: 'Не получилось проверить, свободен ли этот email',
              })
            }
            if (!occupied) {
              return formik.setFieldError('email', null)
            }
            formik.setFieldError('email', msg)
          })
        },
        temp.blur ? 0 : 1000,
      )
    } else if (occupied) {
      errors.email = msg
    }
  } else if (formik.errors.email) {
    errors.email = formik.errors.email
  }
  temp.email = values.email

  return errors
}
