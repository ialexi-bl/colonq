import { MixedDispatch } from 'store/types'
import { ScrollablePage } from 'components/shared/Page'
import { dedupe } from 'util/array'
import { login, profile } from 'config/routes'
import { notifyErrorObject } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useUserService } from 'services/user-service'
import Button from 'components/shared/Button'
import ErrorMessage from 'components/form/ErrorMessage'
import Input from 'components/form/Input'
import Loading from 'components/shared/Loading'
import PageTitle from 'components/shared/PageTitle'
import React, { useState } from 'react'
import Regex from 'config/regex'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import cn from 'clsx'
import useIsGuest from 'hooks/shared/use-is-guest'

type FormValues = {
  email: string
  username: string
  password: string
  passwordRepeat: string
}

export default function Registration() {
  // Loading is used only for password, because social login
  // buttons redirect to oauth page and don't load anything
  // TODO: add extra state for email verification so one can login with social
  // networks after logging in traditionally
  const [status, setStatus] = useState<null | 'loading' | 'verify-email'>(null)
  const dispatch = useDispatch<MixedDispatch>()
  const userService = useUserService()

  const register = async (values: FormValues) => {
    if (status) return
    setStatus('loading')

    try {
      const result = await userService.register(
        values.email,
        values.username,
        values.password,
      )

      if (result.emailVerified) {
        dispatch(
          push(login(), {
            email: values.email,
            password: values.password,
          }),
        )
      } else {
        setStatus('verify-email')
      }
    } catch (e) {
      // TODO: check if some errors may be handled or modify interface
      dispatch(notifyErrorObject(e))
      setStatus(null)
    }
  }
  const formik = useFormik<FormValues>({
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

  const disabled = status === 'loading'
  return (
    <ScrollablePage>
      <PageTitle icon={<User />}>Регистрация</PageTitle>

      <div className={'max-w-xl mx-auto px-4 pb-64'}>
        <div className={'relative'}>
          <form
            className={cn(
              'duration-500 transform',
              status === 'verify-email' && 'translate-x-full opacity-0',
            )}
            onSubmit={formik.handleSubmit}
          >
            <label className={'block mb-4'}>
              <span className={'mb-1'}>Email</span>
              <Input
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
                state={getInputState(formik, 'password')}
                {...formik.getFieldProps('password')}
              />
              <ErrorMessage
                // Not checking if there are spaces, because they will be validated
                // with password repeat
                message={formik.touched.password && formik.errors.password}
              />
            </label>
            <label className={'block mb-4'}>
              <span className={'mb-1'}>Повтори пароль</span>
              <Input
                variant={2}
                disabled={disabled}
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
              <Button
                className={'text-center min-w-64'}
                disabled={status !== null}
                variant={3}
              >
                {/* TODO: check what if this loading looks fine */}
                {status ? <Loading /> : 'Продолжить'}
              </Button>
            </div>
          </form>
          <div
            className={cn(
              'absolute inset-0 flex flex-col justify-center',
              'duration-500 transform',
              status !== 'verify-email' && '-transition-x-full opacity-0',
            )}
          >
            <h2 className={'text-2xl'}>Подтвеждение почты</h2>
            <p>
              На адрес "{formik.values.email}" должно было прийти письмо с
              ссылкой для подтверждения почты. Перейди по ней, чтобы закончить
              регистрацию.
            </p>
          </div>
        </div>

        <div className={'my-16 text-center text-xl'}>ИЛИ</div>

        <SocialLoginButton
          type={'register'}
          disabled={status === 'loading'}
          provider={'google'}
          className={'mb-2'}
        />
        <SocialLoginButton
          type={'register'}
          disabled={status === 'loading'}
          provider={'vk'}
        />
      </div>
    </ScrollablePage>
  )
}

// Can't type formik here, because there is no declaration for
// whatever `useFormik` returns
const getInputState = (formik: any, field: keyof FormValues) =>
  formik.touched[field] ? (formik.errors[field] ? 'invalid' : 'valid') : null

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {}

  if (!values.email.trim()) {
    errors.email = 'Email нужен обязательно'
  } else if (!Regex.email.test(values.email)) {
    errors.email = 'Это недействительный email'
  }

  if (!values.username.trim()) {
    errors.username = 'Введи имя пользователя'
  } else if (values.username.length < 4) {
    errors.username = 'Имя пользователя должно быть не короче 4 символов'
  } else if (values.username.length > 64) {
    errors.username = 'Имя пользователя должно быть не длиннее 64 символов'
  } else if (!Regex.username.test(values.username)) {
    const forbiddenChars = values.username.match(Regex.usernameForbiddenChars)!

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
