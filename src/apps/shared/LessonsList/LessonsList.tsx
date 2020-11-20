import { App, loadApp } from 'store/user'
import { AppState } from 'store/types'
import { Elevation } from 'config/view'
import { RouteComponentProps, app as appRoute } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useElevationClassnames } from 'hooks/use-elevation'
import { withAuth } from 'components/shared/EnsureAuthenticated'
import PageTitle from 'components/shared/PageTitle'
import React, { ReactNode, useEffect } from 'react'
import ThemeActionItem from 'components/shared/ThemeActionItem'
import useItemsToggler from 'hooks/use-items-toggler'

export type LessonsListProps = RouteComponentProps & {
  app: string
  icon?: ReactNode
  title: string
}
function LessonsList({
  icon,
  title,
  visible,
  setProgress,
  app: appName,
}: LessonsListProps) {
  const dispatch = useDispatch()
  const [visibleItems, toggleVisible] = useItemsToggler()
  const elevationCn = useElevationClassnames(Elevation.lessonsList)
  const app = useSelector<AppState, App | undefined>(
    (state) => state.user.apps[appName],
  )

  useEffect(() => {
    if (!app || app.status !== 'loaded') {
      dispatch(loadApp(appName))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appName])
  useEffect(() => {
    if (app?.status === 'loaded') {
      setProgress(100)
    }
  }, [app?.status, setProgress])

  if (!visible || !app || app.status !== 'loaded') return null
  return (
    <ScrollablePage
      routeElevation={Elevation.lessonsList}
      className={elevationCn}
    >
      <PageTitle icon={icon}>{title}</PageTitle>

      <div className={'px-4 mt-4'}>
        {app.lessons.map((lesson, i) => (
          <ThemeActionItem
            i={i}
            key={lesson.id}
            icon={lesson.icon}
            title={lesson.title}
            progress={lesson.score / 100}
            disabled={!lesson.unlocked}
            expanded={lesson.id in visibleItems}
            className={'mb-2'}
            toggleVisible={
              lesson.unlocked ? () => toggleVisible(lesson.id) : undefined
            }
            actions={[
              {
                id: 0,
                label: 'Начать занятие',
                primary: true,
                action: () =>
                  dispatch(
                    push(appRoute(appName, `lesson/${lesson.id}`), {
                      redirect: appRoute(appName, 'list'),
                    }),
                  ),
              },
            ]}
          />
        ))}
      </div>
    </ScrollablePage>
  )
}

export default withAuth(LessonsList)
