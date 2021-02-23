import { Elevation } from 'config/view'
import { Helmet } from 'react-helmet'
import { HttpError } from 'core/errors'
import { MixedDispatch } from 'store/types'
import { RouteComponentProps, appsList } from 'config/routes'
import { TextArea } from 'components/form/Input/TextArea'
import { decline } from 'util/lang'
import { notifyError, notifyHttpError } from 'store/view'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import Button, { LinkButton } from 'components/shared/Button'
import Config from 'config'
import ErrorMessage from 'components/form/ErrorMessage'
import FeedbackIcon from 'components/icons/Feedback'
import MiscApi from 'core/api/services/misc'
import Page from 'components/shared/Page'
import PageTitle from 'components/shared/PageTitle'
import Slider from 'components/shared/Slider/Slider'
import useElevation from 'hooks/use-elevation'
import useIsAuthenticated from 'hooks/use-is-authenticated'

export default function Feedback({ setProgress }: RouteComponentProps) {
  const dispatch = useDispatch<MixedDispatch>()
  useEffect(() => setProgress(100), [setProgress])
  useElevation(Elevation.feedback)

  const formik = useFormik({
    initialValues: { message: '' },
    validate: ({ message }) => {
      const errors: any = {}
      if (message.length < 25) errors.message = 'Слишком короткое сообщение'
      if (message.length > 1000) errors.message = 'Слишком длинное сообщение'
      return errors
    },
    onSubmit: async ({ message }) => {
      try {
        await MiscApi.sendFeedback(message)
        formik.setStatus('success')
      } catch (e) {
        if (e instanceof HttpError) {
          dispatch(notifyHttpError(e))
        } else {
          dispatch(
            notifyError(
              'Не удалось записать отзыв, попробуй ещё раз чуть позже',
            ),
          )
        }
      }
    },
  })
  // @ts-ignore
  window.formik = formik

  if (!useIsAuthenticated()) return null

  const { length } = formik.values.message
  return (
    <Page
      routeElevation={Elevation.feedback}
      className={'bg-page route-overlay'}
    >
      <Helmet>
        <title>Обратная связь</title>
      </Helmet>
      <div className={'container'}>
        <PageTitle icon={<FeedbackIcon />}>Обратная связь</PageTitle>

        <Slider
          active={formik.status === 'success'}
          defaultView={
            <form
              className={'max-w-3xl mx-auto'}
              onSubmit={formik.handleSubmit}
            >
              <p className={'pb-6'}>
                Здесь ты можешь оставить отзыв, сообщить об ошибке или
                предложить, как можно улучшить ColonQ. Ты также можешь написать
                письмо на{' '}
                <a
                  className={
                    'text-blue-400 hover:text-blue-300 focus:text-blue-400'
                  }
                  href={`mailto:${Config.FEEDBACK_EMAIL}`}
                >
                  {Config.FEEDBACK_EMAIL}
                </a>
                .
              </p>
              <div className={'max-w-xl mx-auto'}>
                <TextArea
                  rows={10}
                  className={'w-full mx-auto max-h-96'}
                  placeholder={'Сообщение'}
                  {...formik.getFieldProps('message')}
                />
                <div className={'flex flex-col items-end'}>
                  <div className={'flex w-full'}>
                    <ErrorMessage
                      className={'flex-1'}
                      message={
                        formik.touched.message ? formik.errors.message : null
                      }
                    />
                    <span
                      className={
                        length <= 1000 ? 'text-disabled-400' : 'text-error'
                      }
                    >
                      {getLabel(length)}
                    </span>
                  </div>
                  <Button disabled={length < 25 || length > 1000}>
                    Отправить
                  </Button>
                </div>
              </div>
            </form>
          }
          extraView={
            <div className={'flex flex-col items-center my-16'}>
              <p className={'mb-6 text-2xl'}>Отзыв записан, спасибо!</p>
              <LinkButton to={appsList()} className={'max-w-md'}>
                На главную
              </LinkButton>
            </div>
          }
        />
      </div>
    </Page>
  )
}

const getLabel = (length: number) =>
  length < 25
    ? `Ещё ${25 - length} ${decline(25 - length, [
        'символ',
        'символа',
        'символов',
      ])}...`
    : `${length}/1000`
