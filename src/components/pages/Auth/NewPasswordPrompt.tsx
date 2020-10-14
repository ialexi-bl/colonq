import { useFormik } from 'formik'
import Button from 'components/shared/Button'
import ErrorMessage from 'components/form/ErrorMessage'
import Input from 'components/form/Input'
import Loading from 'components/shared/Loading'
import Page from 'components/shared/Page'
import React from 'react'

type FormValues = {
  password: string
  passwordRepeat: string
}

export default function NewPasswordPrompt({
  onSubmit,
  loading,
}: {
  onSubmit: (password: string) => void
  loading?: boolean
}) {
  const formik = useFormik<FormValues>({
    initialValues: { password: '', passwordRepeat: '' },
    onSubmit: ({ password }) => onSubmit(password),
    validate,
  })

  return (
    <Page className={'px-4'}>
      {/* TODO: add icon and title */}
      <form className={'max-w-xl mx-auto'}>
        <label className={'block mb-4'}>
          <span className={'mb-1'}>Новый пароль</span>
          <Input
            disabled={loading}
            state={getInputState(formik, 'password')}
            {...formik.getFieldProps('password')}
          />
          <ErrorMessage
            message={formik.touched.password && formik.errors.password}
          />
        </label>
        <label className={'block mb-4'}>
          <span className={'mb-1'}>Повтори пароль</span>
          <Input
            disabled={loading}
            state={getInputState(formik, 'passwordRepeat')}
            {...formik.getFieldProps('passwordRepeat')}
          />
          <ErrorMessage
            message={formik.touched.password && formik.errors.password}
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
    </Page>
  )
}

const getInputState = (formik: any, field: keyof FormValues) =>
  formik.touched[field] ? (formik.errors[field] ? 'invalid' : 'valid') : null
function validate(values: FormValues) {
  const errors: Partial<FormValues> = {}

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
