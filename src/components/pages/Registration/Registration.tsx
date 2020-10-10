import { ScrollablePage } from 'components/shared/Page'
import { profile } from 'config/routes'
import Button from 'components/shared/Button'
import Input from 'components/form/Input'
import PageTitle from 'components/shared/PageTitle'
import React, { useState } from 'react'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import useIsGuest from 'hooks/shared/use-is-guest'
import { useFormik } from 'formik'
import { emailRegex, usernameForbiddenChars, usernameRegex } from 'config/regex'
import { dedupe } from 'util/array'
import ErrorMessage from 'components/form/ErrorMessage'
import ApiClient from 'services/client'
import { Endpoints } from 'config/endpoints'

type FormValues = {
  email: string
  username: string
  password: string
  passwordRepeat: string
}

export default function Registration() {
  const [loading, setLoading] = useState(false)
  const requests = useRequests({
    register: '/api/register',
  })

  const register = async (values: FormValues) => {
    try {
      await ApiClient.post(Endpoints.Auth.register, {
        json: {
          email: values.email,
          username: values.username,
          password: values.password,
        },
      })
    } catch (e) {}
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      passwordRepeat: '',
    },
    validate,
    onSubmit: register,
  })

  if (!useIsGuest(profile())) {
    return null
  }

  return (
    <ScrollablePage>
      <PageTitle icon={<User />}>Регистрация</PageTitle>

      <div className={'px-4 pb-64'}>
        <form onSubmit={formik.handleSubmit}>
          <label className={'block mb-4'}>
            <span className={'mb-1'}>Email</span>
            <Input
              state={getInputState(formik, 'email')}
              {...formik.getFieldProps('email')}
            />
            <ErrorMessage
              message={formik.touched.email && formik.errors.email}
            />
          </label>
          <label className={'block mb-4'}>
            <span className={'mb-1'}>Имя пользователя</span>
            <Input
              variant={2}
              state={getInputState(formik, 'username')}
              {...formik.getFieldProps('username')}
            />
            <ErrorMessage
              message={formik.touched.username && formik.errors.username}
            />
          </label>
          <label className={'block mb-4'}>
            <span className={'mb-1'}>Пароль</span>
            <Input
              variant={3}
              state={getInputState(formik, 'password')}
              {...formik.getFieldProps('password')}
            />
            <ErrorMessage
              message={
                (formik.touched.password && formik.errors.password) ||
                (/(^\s+)|(\s+$)/.test(formik.values.password) && {
                  type: 'warning',
                  text:
                    'Пароль содержит пробелы в начале или в конце. Исправь, если они оказались там случайно',
                })
              }
            />
          </label>
          <label className={'block mb-4'}>
            <span className={'mb-1'}>Повтори пароль</span>
            <Input
              variant={2}
              state={getInputState(formik, 'passwordRepeat')}
              {...formik.getFieldProps('passwordRepeat')}
            />
            <ErrorMessage
              message={
                formik.touched.passwordRepeat && formik.errors.passwordRepeat
              }
            />
          </label>
          <div className={'text-center'}>
            <Button variant={3} className={'text-center min-w-64'}>
              Продолжить
            </Button>
          </div>
        </form>

        <div className={'my-16 text-center text-xl'}>ИЛИ</div>

        <SocialLoginButton provider={'google'} className={'mb-2'} />
        <SocialLoginButton provider={'vk'} />
      </div>
    </ScrollablePage>
  )
}

// Can't type formik here, because there is no declaration for
// whatever `useFormik` returns
const getInputState = (formik: any, field: string) =>
  formik.touched[field] ? (formik.errors[field] ? 'invalid' : 'valid') : null

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {}
  if (!values.email.trim()) {
    errors.email = 'Email нужен обязательно'
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Это недействительный email'
  }

  if (!values.username.trim()) {
    errors.username = 'Введи имя пользователя'
  } else if (values.username.length < 4) {
    errors.username = 'Имя пользователя должно быть не короче 4 символов'
  } else if (values.username.length > 64) {
    errors.username = 'Имя пользователя должно быть не длиннее 64 символов'
  } else if (!usernameRegex.test(values.username)) {
    const forbiddenChars = values.username.match(usernameForbiddenChars)!

    errors.username = `Нельзя использовать символы: ${dedupe(
      forbiddenChars,
    ).join(', ')}`
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
