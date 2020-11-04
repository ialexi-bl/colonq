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
}

export default async function validate(
  values: RegistrationFormValues,
  temp: TempValidationData,
  formik: any,
) {
  const errors: Partial<RegistrationFormValues> = {}

  if (temp.timer) {
    clearTimeout(temp.timer)
  }

  if (!values.email.trim()) {
    errors.email = 'Email нужен обязательно'
  } else if (!Regex.email.test(values.email)) {
    errors.email = 'Это недействительный email'
  } else {
    const msg = 'Этот email уже занят'
    const occupied = UserApi.isEmailOccupiedCache(values.email)

    if (occupied === null) {
      errors.email = 'pending'
      temp.timer = window.setTimeout(
        () => {
          // TODO: maybe also see 400 errors returned from server as validation fail
          UserApi.isEmailOccupied(values.email).then((occupied) => {
            if (!occupied) {
              return formik.setFieldError('email', null)
            }
            formik.setFieldError('email', msg)
            temp.timer = null
          })
        },
        temp.blur ? 0 : 1000,
      )
    } else if (occupied) {
      errors.email = msg
    }
  }

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

  if (!values.password) {
    errors.password = 'Введи пароль'
  } else if (values.password.length < 8) {
    errors.password = 'Пароль должен быть не короче 8 символов'
  } else if (values.password.length > 128) {
    errors.password = 'Пароль должен быть не длиннее 128 символов'
  }

  if (!values.passwordRepeat) {
    errors.passwordRepeat = 'Нужно подтвердить пароль'
  } else if (values.passwordRepeat !== values.password) {
    errors.passwordRepeat = 'Пароли не совпадают'
  }

  return errors
}
