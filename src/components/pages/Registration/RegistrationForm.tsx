import { MixedDispatch } from 'store/types'
import { login } from 'config/routes'
import { notifyErrorObject } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import AuthService from 'core/api/services/auth'
import CompoundInput from 'components/shared/CompoundInput'
import LoadingButton from 'components/shared/LoadingButton'
import Slider from 'components/shared/Slider/Slider'
import VerifyEmailMessage from 'components/shared/VerifyEmailMessage/VerifyEmailMessage'
import cn from 'clsx'
import validate, {
  RegistrationFormValues,
  TempValidationData,
} from './validate'

export default function RegistrationForm({
  setLoading,
}: {
  setLoading?: (state: boolean) => void
}) {
  // TODO: add extra state for email verification so one can login with social
  // networks after logging in traditionally
  const [status, setStatus] = useState<null | 'loading' | 'verify-email'>(null)
  const dispatch = useDispatch<MixedDispatch>()
  const temp = useRef<TempValidationData>({
    blur: false,
    timer: null,
    submitting: false,
  })

  const register = async (values: RegistrationFormValues) => {
    if (status) return
    setStatus('loading')
    setLoading?.(true)

    try {
      const { data } = await AuthService.register(
        values.email,
        values.username,
        values.password,
      )

      if (data.emailVerified) {
        dispatch(
          push(login(), {
            email: values.email,
            password: values.password,
          }),
        )
      } else {
        setStatus('verify-email')
        setLoading?.(false)
      }
    } catch (e) {
      // TODO: check if some errors may be handled or modify ui
      dispatch(notifyErrorObject(e))
      setLoading?.(false)
      setStatus(null)
    }
  }
  const formik = useFormik<RegistrationFormValues>({
    initialValues: {
      email: '',
      username: '',
      password: '',
      passwordRepeat: '',
    },
    onSubmit: register,
    validate: (values) => {
      // TODO: ask on stackoverflow why this code produces error when not assigning to a variable
      const errors = validate(values, temp.current, formik)
      return errors
    },
  })

  const loading = status === 'loading'
  return (
    <Slider
      active={status === 'verify-email'}
      className={'w-full'}
      defaultView={
        <form
          className={cn(
            'duration-500 transform',
            status === 'verify-email' && '-translate-x-full opacity-0',
          )}
          onSubmit={(e) => {
            temp.current.submitting = true
            formik.handleSubmit(e)
            temp.current.submitting = false
          }}
        >
          <CompoundInput
            label={'Имя пользователя'}
            meta={formik.getFieldMeta('username')}
            props={formik.getFieldProps('username')}
            loading={loading}
            variant={2}
          />
          <CompoundInput
            type={'email'}
            label={'Email'}
            meta={formik.getFieldMeta('email')}
            props={formik.getFieldProps('email')}
            loading={loading}
            variant={1}
            onFocus={() => {
              temp.current.blur = false
            }}
            onBlur={(e) => {
              temp.current.blur = true
              formik.handleBlur(e)
            }}
          />
          <CompoundInput
            label={'Пароль'}
            loading={loading}
            meta={formik.getFieldMeta('password')}
            props={formik.getFieldProps('password')}
            variant={3}
            password
          />
          <CompoundInput
            label={'Повтори пароль'}
            meta={formik.getFieldMeta('passwordRepeat')}
            props={formik.getFieldProps('passwordRepeat')}
            loading={loading}
            variant={2}
            password
          />

          <LoadingButton
            disabled={
              status === 'verify-email' || Object.keys(formik.errors).length > 0
            }
            loading={status === 'loading'}
            variant={3}
            type={'submit'}
          >
            Зарегестрироваться
          </LoadingButton>
        </form>
      }
      extraView={<VerifyEmailMessage email={formik.values.email} />}
    />
  )
}
