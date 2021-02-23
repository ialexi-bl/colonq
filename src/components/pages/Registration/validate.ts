import AuthService from 'core/api/services/auth'
import Validate from 'core/validation'

export type RegistrationFormValues = {
  email: string
  username: string
  password: string
  passwordRepeat: string
}
export type TempValidationData = {
  /** Indicates whether email field is blurred */
  blur: boolean
  /** Timeout that is going to verify email */
  timer: null | number
  /** Last email that has been validated */
  email?: string
  /** Indicates if validation happens after submission */
  submitting: boolean
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
): Partial<RegistrationFormValues> {
  const errors: Partial<RegistrationFormValues> = {}

  // Validating user name
  const vusername = Validate.username(values.username)
  if (vusername) errors.username = vusername

  const vpassword = Validate.password(values.password)
  if (vpassword) errors.password = vpassword

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

  const vemail = Validate.emailFormat(values.email)
  if (vemail) {
    errors.email = vemail
  }
  // Verifying that email is not occupied
  else if (!temp.submitting && temp.email !== values.email) {
    const msg = 'Этот email уже занят'
    const occupied = AuthService.isEmailOccupiedCache(values.email)

    // Do not request if this email has already been checked
    if (occupied === true) {
      errors.email = msg
    } else {
      errors.email = 'pending'
      temp.timer = window.setTimeout(
        () => {
          AuthService.isEmailOccupied(values.email).then((occupied) => {
            // If temp.email has changed, it means
            // that another email has been supplied
            // while the request or timeout was working
            // so current check should be dismissed
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
        // Validating immediately if field is blurred
        temp.blur ? 0 : 1000,
      )
    }
  } else if (!temp.submitting && formik.errors.email) {
    // Keeping email error so that it doesn't get reset
    // every time another field gets validated
    errors.email = formik.errors.email
  }
  // Setting temp.email so that if a check that has been
  // cancelled still proceeds, it doesn't set a message about
  // an outdated email which should be taken care of by
  // another check
  temp.email = values.email

  return errors
}
