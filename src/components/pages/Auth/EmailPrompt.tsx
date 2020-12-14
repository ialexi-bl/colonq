import { useFormik } from 'formik'
import ErrorMessage from 'components/form/ErrorMessage'
import Input from 'components/form/Input'
import LoadingButton from 'components/shared/LoadingButton'
import Page from 'components/shared/Page'
import PageTitle from 'components/shared/PageTitle'
import Regex from 'config/regex'
import User from 'components/icons/User'
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
      <PageTitle icon={<User />}>Ввод почты</PageTitle>
      {/* TODO: add icon and title */}
      <div className={'max-w-xl mx-auto relative'}>
        <form
          onSubmit={formik.handleSubmit}
          className={cn(
            'duration-500 transform',
            emailSent && 'translate-x-full opacity-0',
          )}
        >
          <p>
            Социальная сеть не предоставила твой адрес электронной почты,
            поэтому его нужно ввести вручную
          </p>
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
            <LoadingButton
              disabled={loading || !!formik.errors.email}
              loading={loading}
              variant={3}
              type={'submit'}
            >
              Продолжить
            </LoadingButton>
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
