import { ApiErrorName } from 'services/api/config'
import { CUTE_FACE } from 'config/view'
import { HttpError } from 'services/errors'
import { app } from 'config/routes'
import { goBack } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import Button, { LinkButton } from 'components/shared/Button'
import Config from 'config'
import LoadingButton from 'components/shared/LoadingButton'
import LoadingError from 'components/shared/LoadingError/LoadingError'

export type AppErrorName = 'no-problems' | 'locked' | 'unknown'
export type AppErrorProps = {
  id: string
  type?: AppErrorName
  retry?: () => void
  retrying?: boolean
  className?: string
}

export async function appHttpError(error: HttpError): Promise<AppErrorName> {
  const name = await error.getApiName()
  switch (name) {
    case ApiErrorName.NO_PROBLEMS_ERROR:
      return 'no-problems'
    case ApiErrorName.FORBIDDEN:
      return 'locked'
    case ApiErrorName.NOT_FOUND:
      if (Config.IS_DEV) {
        console.warn('API endpoint for app not found')
      }
    // falls through
    default:
      return 'unknown'
  }
}

export default function AppError({
  id,
  retry,
  retrying,
  className,
  type = 'unknown',
}: AppErrorProps) {
  switch (type) {
    case 'locked':
      return (
        <LoadingError
          className={className}
          title={'Этот урок пока заблокирован'}
          detail={'Заверши предыдущие уроки, чтобы получить к нему доступ'}
          actions={[
            <LinkButton
              className={'min-w-64'}
              to={app(id, 'stats')}
              variant={2}
              key={1}
            >
              Список уроков
            </LinkButton>,
            <BackButton key={2} />,
          ]}
        />
      )
    case 'no-problems':
      return (
        <LoadingError
          className={className}
          title={'В этом уроке нет ни одного задания'}
          detail={'Ты можешь включить их в настройках приложения'}
          actions={[
            <LinkButton
              className={'min-w-64'}
              variant={2}
              key={1}
              to={app(id, 'settings')}
            >
              К настройкам
            </LinkButton>,
            <BackButton key={2} />,
          ]}
        />
      )
    case 'unknown':
      return (
        <LoadingError
          className={className}
          title={`Не удалось загрузить данные ${CUTE_FACE}`}
          actions={[
            retry && (
              <LoadingButton
                className={'min-w-64'}
                loading={retrying}
                onClick={retry}
                variant={2}
                key={1}
              >
                Попробовать ещё раз
              </LoadingButton>
            ),
            <BackButton key={2} />,
          ]}
        />
      )
    default:
      return null
  }
}

const BackButton = () => {
  const dispatch = useDispatch()

  return (
    <Button className={'min-w-64'} onClick={() => dispatch(goBack())} secondary>
      Назад
    </Button>
  )
}
