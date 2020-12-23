import { Elevation } from 'config/view'
import { FormikHelpers, useFormik } from 'formik'
import { Helmet } from 'react-helmet'
import { HttpError } from 'services/errors'
import { LinkButton } from 'components/shared/Button'
import { MixedDispatch } from 'store/types'
import {
  RouteComponentProps,
  appsList,
  register,
  resetPassword,
} from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { UserApi } from 'services/api'
import { notifyErrorObject } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useElevationClassnames } from 'hooks/use-elevation'
import { useLocation } from 'react-router'
import CompoundInput from 'components/shared/CompoundInput'
import ErrorMessage from 'components/form/ErrorMessage'
import LoadingButton from 'components/shared/LoadingButton'
import PageTitle from 'components/shared/PageTitle'
import SocialLoginButton from 'components/form/SocialLoginButton'
import User from 'components/icons/User'
import cn from 'clsx'
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
    formik: FormikHelpers<FormValues>,
  ) => {
    if (loading) return
    setLoading(true)
    formik.setStatus(null)

    try {
      await dispatch(UserApi.login(values.login, values.password))
      push(appsList())
    } catch (e) {
      setLoading(false)
      if (e instanceof HttpError) {
        return formik.setStatus(await e.getApiMessage())
      }

      dispatch(notifyErrorObject(e))
    } finally {
      setLoading(false)
    }
  }
  const formik = useFormik<FormValues>({
    initialValues: {
      login: typeof email === 'string' ? email : 'alex',
      password: typeof password === 'string' ? password : 'sofia9841263',
    },
    validate: ({ login, password }) => {
      const errors: Partial<FormValues> = {}
      if (!login) errors.login = 'Введи email или имя пользователя'
      if (!password) errors.password = 'Введи пароль'
      return errors
    },
    onSubmit: login,
  })
  const elevationCn = useElevationClassnames(Elevation.login, {
    same: 'left',
  })

  if (!useIsGuest()) {
    return null
  }

  const autofocusPassword = formik.values.login !== ''
  return (
    <ScrollablePage
      routeElevation={Elevation.login}
      className={cn('bg-page', elevationCn)}
    >
      <Helmet>
        <title>Вход</title>
      </Helmet>
      <PageTitle icon={<User />}>Вход</PageTitle>

      <div className={'max-w-xl mx-auto px-4 pb-64 overflow-hidden'}>
        <form onSubmit={formik.handleSubmit}>
          <CompoundInput
            autoFocus={!autofocusPassword}
            loading={loading}
            variant={2}
            label={'Email или имя пользователя'}
            props={formik.getFieldProps('login')}
            meta={formik.getFieldMeta('login')}
          />
          <CompoundInput
            autoFocus={autofocusPassword}
            loading={loading}
            variant={3}
            props={formik.getFieldProps('password')}
            label={'Пароль'}
            type={'password'}
            meta={formik.getFieldMeta('password')}
            warning={
              /(^\s+)|(\s+$)/.test(formik.values.password) &&
              'Пароль содержит пробелы в начале или в конце. Исправь, если они оказались там случайно'
            }
          />
          <ErrorMessage className={'mb-4'} message={formik.status} />
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
            to={resetPassword()}
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
    </ScrollablePage>
  )
}
