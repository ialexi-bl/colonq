import { App, Lesson, loadApp } from 'store/user'
import { AppState } from 'store/types'
import { Elevation } from 'config/view'
import { Fal } from 'components/shared/Fab'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, app as appRoute } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useElevationClassnames } from 'hooks/use-elevation'
import Button from 'components/shared/Button'
import LessonsList from 'apps/shared/LessonsList'
import LoadingError from 'components/shared/LoadingError'
import PageTitle from 'components/shared/PageTitle'
import Settings from 'components/icons/Settings'
import cn from 'clsx'
import useAppTitle from 'hooks/use-app-title'
import useWasTrue from 'hooks/use-was-true'

export type WordsLessonsListProps = RouteComponentProps & {
  app: string
}

export default function WordsLessonsList({
  app: appName,
  visible,
  setProgress,
}: WordsLessonsListProps) {
  const dispatch = useDispatch()
  const title = useAppTitle(appName)
  const app = useSelector<AppState, App | undefined>(
    (state) => state.user.apps[appName],
  )
  const hadError = useWasTrue(app?.status === 'error')

  useEffect(() => {
    if (!app || app.status !== 'loaded') {
      dispatch(loadApp(appName))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appName])
  useEffect(() => {
    if (app && app.status !== 'loading') {
      setProgress(100)
    }
  }, [app, app?.status, setProgress])

  const elevationCn = useElevationClassnames(Elevation.appsSettings, {
    above: 'overlay',
    same: 'left',
  })

  if (!visible || !app) return null
  if (hadError && app.status !== 'loaded') {
    return (
      <Wrapper className={elevationCn}>
        <Helmet>
          <title>Ошибка - Список уроков</title>
        </Helmet>
        <LoadingError
          title={'Не удалось загрузить уроки'}
          actions={
            <Button
              className={'min-w-64'}
              onClick={() => dispatch(loadApp(appName))}
            >
              Попробовать ещё раз
            </Button>
          }
        />
      </Wrapper>
    )
  }

  return (
    <Wrapper className={elevationCn}>
      <Helmet>
        <title>Список уроков - {app.title}</title>
      </Helmet>
      <PageTitle>{app.title}</PageTitle>

      <p className={'px-4 mb-4'}>Нажми на урок, чтобы начать практику</p>

      <LessonsList app={appName} lessons={app.lessons as Lesson[]} />
      {app.hasSettings && (
        <Fal to={appRoute(appName, 'settings')} icon={<Settings />} />
      )}
    </Wrapper>
  )
}
const Wrapper = ({ children, className }: BasicProps) => (
  <ScrollablePage
    routeElevation={Elevation.lessonsList}
    className={cn(className, 'bg-page')}
  >
    {children}
  </ScrollablePage>
)
