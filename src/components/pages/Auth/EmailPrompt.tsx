import { useFormik } from 'formik'
import CompoundInput from 'components/shared/CompoundInput'
import LoadingButton from 'components/shared/LoadingButton'
import Page from 'components/shared/Page'
import PageTitle from 'components/shared/PageTitle'
import Regex from 'config/regex'
import Slider from 'components/shared/Slider/Slider'
import User from 'components/icons/User'

type FormValues = { email: string }

export default function EmailPrompt({
  submit,
}: {
  submit: (email: string) => Promise<boolean>
}) {
  const formik = useFormik<FormValues>({
    initialValues: { email: '' },
    onSubmit: ({ email }) => {
      formik.setStatus('loading')
      submit(email)
        .then(() => formik.setStatus('success'))
        .catch(() => formik.setStatus(null))
    },
    validate,
  })

  const loading = formik.status === 'loading'
  return (
    <Page className={'px-4'}>
      <PageTitle icon={<User />}>Ввод почты</PageTitle>

      <Slider
        active={formik.status === 'success'}
        defaultView={
          <form onSubmit={formik.handleSubmit}>
            <p>
              Социальная сеть не предоставила твой адрес электронной почты,
              поэтому его нужно ввести вручную
            </p>
            <CompoundInput
              name={'email'}
              type={'email'}
              meta={formik.getFieldMeta('email')}
              props={formik.getFieldProps('email')}
              title={'Email'}
              variant={2}
            />
            <LoadingButton
              disabled={Object.keys(formik.errors).length > 0}
              loading={loading}
              variant={3}
              type={'submit'}
            >
              Продолжить
            </LoadingButton>
          </form>
        }
        extraView={
          <div className={'flex flex-col justify-center'}>
            <h2 className={'text-2xl'}>Подтвеждение почты</h2>
            <p>
              На адрес "{formik.values.email}" должно было прийти письмо с
              ссылкой для подтверждения почты. Перейди по ней, чтобы закончить
              регистрацию.
            </p>
          </div>
        }
      />
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
