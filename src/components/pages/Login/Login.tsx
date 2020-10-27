import { ApiErrorName } from 'services/client/config'
import { CUTE_FACE } from 'config/view'
import { FormikHelpers, useFormik } from 'formik'
import { HttpError } from 'services/errors'
import { MixedDispatch } from 'store/types'
import { PageContainer } from 'components/shared/Page'
import { appsList, profile, register } from 'config/routes'
import { notifyErrorObject } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { useUserService } from 'services/user-service'
import Button, { LinkButton } from 'components/shared/Button'
import ErrorMessage from 'components/form/ErrorMessage'
import Input from 'components/form/Input'
import Loading from 'components/shared/Loading'
import PageTitle from 'components/shared/PageTitle'
import React, { useState } from 'react'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import cn from 'clsx'
import useIsGuest from 'hooks/shared/use-is-guest'

type FormValues = {
  login: string
  password: string
}

export default function Login() {
  const location = useLocation<{ email?: unknown; password?: unknown }>()
  const dispatch = useDispatch<MixedDispatch>()
  const userService = useUserService()
  const { email, password } = location.state || {}
  const [loading, setLoading] = useState(false)

  const login = async (
    values: FormValues,
    formikBag: FormikHelpers<FormValues>,
  ) => {
    if (loading) return
    setLoading(true)

    try {
      await userService.login(values.login, values.password)
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

  if (!useIsGuest(profile())) {
    return null
  }
  // @ts-ignore
  window.a = () => setLoading((a) => !a)

  return (
    <PageContainer>
      <PageTitle icon={<User />}>Вход</PageTitle>

      <div className={'max-w-xl mx-auto px-4'}>
        <form onSubmit={formik.handleSubmit}>
          <label className={'block mb-4'}>
            <span className={'mb-1'}>Email или имя пользователя</span>
            <Input
              readOnly={loading}
              state={getInputState(formik, 'login')}
              {...formik.getFieldProps('login')}
            />
          </label>
          <label className={'block mb-4'}>
            <span className={'mb-1'}>Пароль</span>
            <Input
              variant={3}
              readOnly={loading}
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
          <div className={'flex items-center'}>
            <div className={'w-12 max-w-sm ml-auto'} />
            <Button
              type={'submit'}
              className={'text-center min-w-64'}
              disabled={loading || Object.keys(formik.errors).length > 0}
              variant={3}
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

        <div className={'my-16 text-center text-xl'}>ИЛИ</div>

        <LinkButton
          className={'mb-2 block text-lg max-w-sm'}
          to={register()}
          secondary
        >
          Зарегистрироваться
        </LinkButton>
        <SocialLoginButton
          provider={'google'}
          disabled={loading}
          className={'mb-2 max-w-sm'}
          type={'login'}
        />
        <SocialLoginButton
          disabled={loading}
          provider={'vk'}
          type={'login'}
          className={'max-w-sm'}
        />
      </div>
    </PageContainer>
  )
}

const getInputState = (formik: any, field: keyof FormValues) =>
  formik.touched[field] ? (formik.errors[field] ? 'invalid' : 'valid') : null
