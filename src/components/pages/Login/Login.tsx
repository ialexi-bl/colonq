import { ApiErrorName } from 'services/api/config'
import { CUTE_FACE, Elevation } from 'config/view'
import { FormikHelpers, useFormik } from 'formik'
import { HttpError } from 'services/errors'
import { LinkButton } from 'components/shared/Button'
import { MixedDispatch } from 'store/types'
import { RouteComponentProps, appsList, register } from 'config/routes'
import { UserApi } from 'services/api'
import { notifyErrorObject } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import ErrorMessage from 'components/form/ErrorMessage'
import Input from 'components/form/Input'
import LoadingButton from 'components/shared/LoadingButton'
import Page from 'components/shared/Page'
import PageTitle from 'components/shared/PageTitle'
import React, { useEffect, useState } from 'react'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import useDevUpdateTracker from 'hooks/use-dev-update-tracker'
import useIsGuest from 'hooks/use-is-guest'

type FormValues = {
  login: string
  password: string
}

export default function Login({ setProgress }: RouteComponentProps) {
  const location = useLocation<{ email?: unknown; password?: unknown }>()
  const dispatch = useDispatch<MixedDispatch>()
  const { email, password } = location.state || {}
  const [loading, setLoading] = useState(false)
  useDevUpdateTracker('login', { setProgress })

  useEffect(() => setProgress(100), [setProgress])

  const login = async (
    values: FormValues,
    formikBag: FormikHelpers<FormValues>,
  ) => {
    if (loading) return
    setLoading(true)

    try {
      await dispatch(UserApi.login(values.login, values.password))
      push(appsList())
    } catch (e) {
      setLoading(false)
      if (e instanceof HttpError) {
        const name = await e.getApiName()
        if (name === ApiErrorName.BAD_CREDENTIALS) {
          return formikBag.setStatus(
            `Нет пользователя с таким логином и паролем ${CUTE_FACE}`,
          )
        }
        if (name === ApiErrorName.UNPROCESSABLE_ENTITY) {
          return formikBag.setStatus(
            `Сначала нужно подтвердить адрес электронной почты`,
          )
        }
      }

      dispatch(notifyErrorObject(e))
    } finally {
      setLoading(false)
    }
  }
  const formik = useFormik<FormValues>({
    initialValues: {
      login: typeof email === 'string' ? email : '',
      password: typeof password === 'string' ? password : '',
    },
    onSubmit: login,
  })

  if (!useIsGuest()) {
    return null
  }

  const autofocusPassword = formik.values.login !== ''
  return (
    <Page routeElevation={Elevation.login} className={'bg-page route-left'}>
      <PageTitle icon={<User />}>Вход</PageTitle>

      <div className={'max-w-xl mx-auto px-4 overflow-hidden'}>
        <form onSubmit={formik.handleSubmit}>
          <label className={'block mb-4'}>
            <span className={'mb-2'}>Email или имя пользователя</span>
            <Input
              readOnly={loading}
              autoFocus={!autofocusPassword}
              className={'w-full'}
              state={getInputState(formik, 'login')}
              {...formik.getFieldProps('login')}
            />
          </label>
          <label className={'block mb-4'}>
            <span className={'mb-2'}>Пароль</span>
            <Input
              // TODO: add ability to show password
              type={'password'}
              variant={3}
              autoFocus={autofocusPassword}
              readOnly={loading}
              className={'w-full'}
              state={getInputState(formik, 'password')}
              {...formik.getFieldProps('password')}
            />
            <ErrorMessage
              message={
                /(^\s+)|(\s+$)/.test(formik.values.password) && {
                  type: 'warning',
                  // TODO: maybe move to language files
                  text:
                    'Пароль содержит пробелы в начале или в конце. Исправь, если они оказались там случайно',
                }
              }
            />
            <ErrorMessage message={formik.status} />
          </label>
          <LoadingButton
            type={'submit'}
            variant={3}
            loading={loading}
            disabled={Object.keys(formik.errors).length > 0}
          >
            Войти
          </LoadingButton>
        </form>

        <div className={'my-16 text-center text-xl'}>ИЛИ</div>

        <div className={'flex flex-col items-center'}>
          <SocialLoginButton
            provider={'google'}
            disabled={loading}
            className={'mb-2 max-w-sm w-full'}
            type={'login'}
          />
          <SocialLoginButton
            disabled={loading}
            provider={'vk'}
            type={'login'}
            className={'mb-2 max-w-sm w-full'}
          />
          <LinkButton
            className={'mb-2 block text-lg max-w-sm w-full'}
            to={register()}
            secondary
          >
            Зарегистрироваться
          </LinkButton>
        </div>
      </div>
    </Page>
  )
}

const getInputState = (formik: any, field: keyof FormValues) =>
  formik.touched[field] && formik.errors[field] ? 'invalid' : null
