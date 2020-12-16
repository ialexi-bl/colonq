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
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import CompoundInput from 'components/shared/CompoundInput'
import LoadingButton from 'components/shared/LoadingButton'
import Page from 'components/shared/Page'
import PageTitle from 'components/shared/PageTitle'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
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
    validate: ({ login, password }) => {
      const errors: Partial<FormValues> = {}
      if (!login) errors.login = 'Введи email или имя пользователя'
      if (!password) errors.password = 'Введи пароль'
      return errors
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
          <CompoundInput
            autoFocus={!autofocusPassword}
            loading={loading}
            variant={2}
            title={'Email или имя пользователя'}
            props={formik.getFieldProps('login')}
            name={'login'}
            meta={formik.getFieldMeta('login')}
          />
          <CompoundInput
            autoFocus={autofocusPassword}
            loading={loading}
            variant={3}
            props={formik.getFieldProps('password')}
            title={'Пароль'}
            name={'password'}
            meta={formik.getFieldMeta('password')}
            warning={
              /(^\s+)|(\s+$)/.test(formik.values.password) &&
              'Пароль содержит пробелы в начале или в конце. Исправь, если они оказались там случайно'
            }
          />
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

        <div className={'flex flex-col items-center text-lg'}>
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
            className={'mb-2 block max-w-sm w-full'}
            to={register()}
            secondary
          >
            Восстановить пароль
          </LinkButton>
          <LinkButton
            secondary
            className={'mb-2 block max-w-sm w-full'}
            variant={2}
            to={register()}
          >
            Зарегистрироваться
          </LinkButton>
        </div>
      </div>
    </Page>
  )
}
