import { Elevation } from 'config/view'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik'
import CompoundInput from 'components/shared/CompoundInput'
import LoadingButton from 'components/shared/LoadingButton'
import Page from 'components/shared/Page'
import PageTitle from 'components/shared/PageTitle'
import Regex from 'config/regex'
import Slider from 'components/shared/Slider/Slider'
import User from 'components/icons/User'
import VerifyEmailMessage from 'components/shared/VerifyEmailMessage/VerifyEmailMessage'
import useElevation from 'hooks/use-elevation'

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
      submit(email).then((success) => {
        return formik.setStatus(success ? 'success' : null)
      })
    },
    validate,
  })

  useElevation(Elevation.auth)
  const loading = formik.status === 'loading'
  return (
    <Page
      routeElevation={Elevation.auth}
      className={'container route-overlay bg-page'}
    >
      <Helmet>
        <title>Ввод электронного адреса</title>
      </Helmet>
      <PageTitle icon={<User />}>Ввод почты</PageTitle>

      <div className={'px-4 h-full container'}>
        <Slider
          active={formik.status === 'success'}
          defaultView={
            <form onSubmit={formik.handleSubmit}>
              <p className={'mb-6'}>
                Социальная сеть не предоставила твой адрес электронной почты,
                поэтому его нужно ввести вручную
              </p>
              <CompoundInput
                type={'email'}
                meta={formik.getFieldMeta('email')}
                props={formik.getFieldProps('email')}
                label={'Email'}
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
          extraView={<VerifyEmailMessage email={formik.values.email} />}
        />
      </div>
    </Page>
  )
}

function validate(values: FormValues) {
  if (!values.email.trim()) {
    return { email: 'Введи email' }
  }
  if (!Regex.email.test(values.email)) {
    return { email: 'Это недействительный email' }
  }
  return {}
}
