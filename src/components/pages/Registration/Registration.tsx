import { Elevation } from 'config/view'
import { MixedDispatch } from 'store/types'
import { ScrollablePage } from 'components/shared/Page'
import { UserApi } from 'services/api'
import { index, login } from 'config/routes'
import { notifyErrorObject } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import Button, { LinkButton } from 'components/shared/Button'
import Loading from 'components/shared/Loading'
import PageTitle from 'components/shared/PageTitle'
import React, { useRef, useState } from 'react'
import RegistrationInput from './Input'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import cn from 'clsx'
import useIsGuest from 'hooks/use-is-guest'
import validate, {
  RegistrationFormValues,
  TempValidationData,
} from './validate'

export default function Registration() {
  // Loading is used only for password, because social login
  // buttons redirect to oauth page and don't load anything
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
      }
    } catch (e) {
      // TODO: check if some errors may be handled or modify interface
      dispatch(notifyErrorObject(e))
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
      const errors = validate(values, temp.current, formik)
      temp.current.blur = false
      return errors
    },
  })

  if (!useIsGuest()) return null

  const loading = status === 'loading'
  return (
    <ScrollablePage
      routeElevation={Elevation.registration}
      className={'bg-route route-translate-x'}
    >
      <PageTitle icon={<User />}>Регистрация</PageTitle>

      <div className={'max-w-xl mx-auto px-4 pb-64'}>
        <div className={'relative'}>
          <form
            className={cn(
              'duration-500 transform',
              status === 'verify-email' && '-translate-x-full opacity-0',
            )}
            onSubmit={formik.handleSubmit}
          >
            <RegistrationInput
              variant={1}
              name={'email'}
              title={'Email'}
              formik={formik}
              loading={loading}
              onBlur={(e) => {
                temp.current.blur = true
                formik.handleBlur(e)
              }}
            />
            <RegistrationInput
              variant={2}
              name={'username'}
              title={'Имя пользователя'}
              formik={formik}
              loading={loading}
            />
            <RegistrationInput
              variant={3}
              name={'password'}
              title={'Пароль'}
              formik={formik}
              loading={loading}
              password
            />
            <RegistrationInput
              variant={2}
              name={'passwordRepeat'}
              title={'Повтори пароль'}
              formik={formik}
              loading={loading}
              password
            />
            <div className={'flex items-center'}>
              <div className={'w-12 ml-auto'} />
              <Button
                className={'text-center min-w-64'}
                variant={3}
                disabled={
                  status !== null || Object.keys(formik.errors).length > 0
                }
              >
                Продолжить
              </Button>
              <Loading
                className={cn(
                  'h-8 w-8 ml-4 inline-block mr-auto duration-100',
                  loading ? 'opacity-100' : 'opacity-0',
                )}
              />
            </div>
          </form>
          <div
            className={cn(
              'absolute inset-0 flex flex-col justify-center',
              'duration-500 transform',
              status !== 'verify-email' && 'translate-x-full opacity-0',
            )}
          >
            <h2 className={'text-4xl mb-4'}>Подтвеждение почты</h2>
            <p className={'leading-6 mb-8'}>
              На адрес <strong>{formik.values.email}</strong> должно было прийти
              письмо с ссылкой для подтверждения почты. Перейди по ней, чтобы
              закончить регистрацию.
            </p>
            <LinkButton className={'max-w-xs min-w-48 mx-auto'} to={index()}>
              На главную
            </LinkButton>
          </div>
        </div>

        <div className={'my-16 text-center text-xl'}>ИЛИ</div>

        <div className={'flex flex-col items-center'}>
          <LinkButton
            className={'mb-2 block text-lg max-w-sm w-full'}
            to={login()}
            secondary
          >
            Войти
          </LinkButton>
          <SocialLoginButton
            type={'register'}
            disabled={status === 'loading'}
            provider={'google'}
            className={'mb-2 max-w-sm w-full'}
          />
          <SocialLoginButton
            type={'register'}
            disabled={status === 'loading'}
            provider={'vk'}
            className={'max-w-sm w-full'}
          />
        </div>
      </div>
    </ScrollablePage>
  )
}
