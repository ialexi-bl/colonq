import { App, loadApp } from 'store/user'
import { AppState } from 'store/types'
import { Elevation } from 'config/view'
import { ScrollablePage } from 'components/shared/Page'
import { app as appRoute } from 'config/routes'
import { closeLoading, openLoading } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import PageTitle from 'components/shared/PageTitle'
import React, { ReactNode, useEffect } from 'react'
import ThemeActionItem from 'components/shared/ThemeActionItem'
import useElevation from 'hooks/use-elevation'
import useItemsToggler from 'hooks/use-items-toggler'

export type LessonsListProps = {
  app: string
  icon?: ReactNode
  title: string
}
export default function LessonsList({
  app: appName,
  title,
  icon,
}: LessonsListProps) {
  const dispatch = useDispatch()
  const [visible, toggleVisible] = useItemsToggler()
  const app = useSelector<AppState, App | undefined>(
    (state) => state.user.apps[appName],
  )
  const elevation = useElevation(Elevation.lessonsList)

  useEffect(() => {
    console.log(app)
    if (!app || app.status !== 'loaded') {
      dispatch(openLoading('lessons-list'))
      dispatch(loadApp(appName))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appName])
  useEffect(() => {
    if (app?.status === 'loaded') {
      dispatch(closeLoading('lessons-list'))
    }
  }, [app?.status, dispatch])

  if (!app || app.status !== 'loaded') return null

  return (
    <ScrollablePage
      routeElevation={Elevation.lessonsList}
      className={
        elevation < Elevation.lessonsList ? 'route-overlay bg-page' : 'bg-page'
      }
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
            expanded={lesson.id in visible}
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
