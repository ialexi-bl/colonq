import { App, Lesson, loadApp } from 'store/user'
import { AppState } from 'store/types'
import { Elevation } from 'config/view'
import { Fal } from 'components/shared/Fab'
import { RouteComponentProps, app as appRoute } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { useDispatch, useSelector } from 'react-redux'
import { useElevationClassnames } from 'hooks/use-elevation'
import Button from 'components/shared/Button'
import LessonsList from 'apps/shared/LessonsList'
import LoadingError from 'components/shared/LoadingError'
import PageTitle from 'components/shared/PageTitle'
import React, { useEffect } from 'react'
import Settings from 'components/icons/Settings'
import cn from 'clsx'
import useWasTrue from 'hooks/use-was-true'

export type WordsLessonsListProps = RouteComponentProps & {
  app: string
  title: string
}

export default function WordsLessonsList({
  app: appName,
  title,
  visible,
  setProgress,
}: WordsLessonsListProps) {
  const dispatch = useDispatch()
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
      <PageTitle>{title}</PageTitle>

      <p className={'px-4 mb-4'}>Нажми на урок, чтобы начать практику</p>

      <LessonsList app={appName} lessons={app.lessons as Lesson[]} />
      <Fal to={appRoute(appName, 'settings')} icon={<Settings />} />
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
