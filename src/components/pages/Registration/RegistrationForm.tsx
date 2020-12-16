import { LinkButton } from 'components/shared/Button'
import { MixedDispatch } from 'store/types'
import { UserApi } from 'services/api'
import { index, login } from 'config/routes'
import { notifyErrorObject } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import CompoundInput from 'components/shared/CompoundInput'
import LoadingButton from 'components/shared/LoadingButton'
import Slider from 'components/shared/Slider/Slider'
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
  })

  const register = async (values: RegistrationFormValues) => {
    if (status) return
    setStatus('loading')
    setLoading?.(true)

    try {
      const { data } = await UserApi.register(
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
      // TODO: check if some errors may be handled or modify interface
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
      // TODO: ask on stackoverflow why this code produces error when
      // TODO: not assigning to a variable
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
          onSubmit={formik.handleSubmit}
        >
          <CompoundInput
            name={'username'}
            title={'Имя пользователя'}
            meta={formik.getFieldMeta('username')}
            props={formik.getFieldProps('username')}
            loading={loading}
            variant={2}
          />
          <CompoundInput
            name={'email'}
            type={'email'}
            title={'Email'}
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
            name={'password'}
            title={'Пароль'}
            loading={loading}
            meta={formik.getFieldMeta('password')}
            props={formik.getFieldProps('password')}
            variant={3}
            password
          />
          <CompoundInput
            name={'passwordRepeat'}
            title={'Повтори пароль'}
            meta={formik.getFieldMeta('passwordRepeat')}
            props={formik.getFieldProps('passwordRepeat')}
            loading={loading}
            variant={2}
            password
          />

          <LoadingButton
            disabled={status !== null || Object.keys(formik.errors).length > 0}
            loading={status === 'loading'}
            variant={3}
            type={'submit'}
          >
            Зарегестрироваться
          </LoadingButton>
        </form>
      }
      extraView={
        <div className={'flex flex-col justify-center'}>
          <h2 className={'text-4xl mb-4'}>Подтвеждение почты</h2>
          <p className={'leading-6 mb-8'}>
            На адрес <strong>{formik.values.email}</strong> должно прийти письмо
            с ссылкой для подтверждения почты. Перейди по ней, чтобы завершить
            регистрацию.
          </p>
          <LinkButton className={'max-w-xs min-w-48 mx-auto'} to={index()}>
            На главную
          </LinkButton>
        </div>
      }
    />
  )
}
