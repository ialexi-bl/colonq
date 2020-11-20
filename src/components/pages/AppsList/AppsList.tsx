import { AppState } from 'store/types'
import { Elevation } from 'config/view'
import { Fal } from 'components/shared/Fab'
import { RouteComponentProps, app as appRoute, appsChoice } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { User, loadApps } from 'store/user'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import Edit from 'components/icons/Edit'
import PageTitle from 'components/shared/PageTitle'
import React, { useEffect } from 'react'
import ThemeActionItem from 'components/shared/ThemeActionItem'
import useElevation from 'hooks/use-elevation'
import useIsAuthenticated from 'hooks/use-is-authenticated'
import useItemsToggler from 'hooks/use-items-toggler'

export default function AppsList({
  visible,
  setProgress,
}: RouteComponentProps) {
  const [visibleItems, toggleVisible] = useItemsToggler()
  const dispatch = useDispatch()
  const user = useSelector((state: AppState) => state.user as User)

  useEffect(() => {
    if (user.appsStatus !== 'loaded') dispatch(loadApps())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useElevation(Elevation.appsList)
  useEffect(() => {
    if (user.appsStatus === 'loaded' && !user.appsList.length) {
      dispatch(push(appsChoice()))
    }
    if (user.appsStatus === 'loaded' || user.appsStatus === 'error') {
      setProgress(100)
    }
  }, [dispatch, setProgress, user])

  if (!useIsAuthenticated() || !visible || !user.categories.length) return null

  return (
    <ScrollablePage routeElevation={Elevation.appsList}>
      <PageTitle>Темы</PageTitle>
      <p className={'px-4 mb-12'}>Нажми на тему, чтобы начать занятие</p>

      <div className={'px-4 pb-64'}>
        {user.categories.map((category, i) => {
          return (
            <div className={'mb-8'} key={category.id}>
              <h2 className={'text-2xl mb-8'}>{category.title}</h2>
              {category.apps.map((app, j) => {
                return (
                  <ThemeActionItem
                    key={app.id}
                    icon={app.icon}
                    title={app.title}
                    progress={app.score / 100}
                    expanded={app.id in visibleItems}
                    className={'mb-6'}
                    toggleVisible={() => toggleVisible(app.id)}
                    actions={[
                      {
                        id: 0,
                        primary: true,
                        label: 'Начать занятие',
                        action: () =>
                          dispatch(push(appRoute(app.id, 'practice'))),
                      },
                      {
                        id: 1,
                        label: 'Уроки',
                        action: () => dispatch(push(appRoute(app.id, 'list'))),
                      },
                      {
                        id: 2,
                        label: 'Настройки',
                        action: () =>
                          dispatch(push(appRoute(app.id, 'settings'))),
                      },
                    ]}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
      <Fal to={appsChoice()} icon={<Edit />} />
    </ScrollablePage>
  )
}
