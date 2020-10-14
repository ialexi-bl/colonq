import { useFormik } from 'formik'
import Button from 'components/shared/Button'
import ErrorMessage from 'components/form/ErrorMessage'
import Input from 'components/form/Input'
import Loading from 'components/shared/Loading'
import Page from 'components/shared/Page'
import React from 'react'
import Regex from 'config/regex'
import cn from 'clsx'

type FormValues = { email: string }

export default function EmailPrompt({
  loading,
  onSubmit,
  emailSent,
}: {
  loading?: boolean
  emailSent?: boolean
  onSubmit: (email: string) => void
}) {
  const formik = useFormik<FormValues>({
    initialValues: { email: '' },
    onSubmit: ({ email }) => onSubmit(email),
    validate,
  })

  return (
    <Page className={'px-4'}>
      {/* TODO: add icon and title */}
      <div className={'max-w-xl mx-auto relative'}>
        <form
          className={cn(
            'duration-500 transform',
            emailSent && 'translate-x-full opacity-0',
          )}
        >
          {/* TODO: maybe make one component with form and 
      notification and use here and in registration */}
          <label className={'block mb-4'}>
            <span className={'mb-1'}>Email</span>
            <Input
              disabled={loading}
              state={
                formik.touched.email
                  ? formik.errors.email
                    ? 'invalid'
                    : 'valid'
                  : null
              }
              {...formik.getFieldProps('email')}
            />
            <ErrorMessage
              message={formik.touched.email && formik.errors.email}
            />
          </label>
          <div className={'text-center'}>
            <Button
              className={'text-center min-w-64'}
              disabled={loading}
              variant={3}
            >
              {/* TODO: check what if this loading looks fine */}
              {loading ? <Loading /> : 'Продолжить'}
            </Button>
          </div>
        </form>
        <div
          className={cn(
            'absolute inset-0 flex flex-col justify-center',
            'duration-500 transform',
            !emailSent && '-transition-x-full opacity-0',
          )}
        >
          <h2 className={'text-2xl'}>Подтвеждение почты</h2>
          <p>
            На адрес "{formik.values.email}" должно было прийти письмо с ссылкой
            для подтверждения почты. Перейди по ней, чтобы закончить
            регистрацию.
          </p>
        </div>
      </div>
    </Page>
  )
}

function validate(values: FormValues) {
  if (!values.email.trim()) {
    return { email: 'Email нужен обязательно' }
  }
  if (!Regex.email.test(values.email)) {
    return { email: 'Это недействительный email' }
  }
  return {}
}
