import { AppState } from 'store/types'
import { Fal } from 'components/shared/Fab'
import { ScrollablePage } from 'components/shared/Page'
import { User, loadApps } from 'store/user'
import { app as appRoute, appsChoice, appsList } from 'config/routes'
import { closeLoading, openLoading } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import PageTitle from 'components/shared/PageTitle'
import PracticeIcon from 'components/icons/Practice'
import React, { useEffect } from 'react'
import ThemeActionItem from 'components/shared/ThemeActionItem'
import useIsAuthenticated from 'hooks/use-is-authenticated'
import useItemsToggler from 'hooks/use-items-toggler'

export default function AppsList() {
  const [visible, toggleVisible] = useItemsToggler()
  const dispatch = useDispatch()
  const user = useSelector((state: AppState) => state.user as User)

  useEffect(() => {
    if (user.appsStatus !== 'loaded') {
      dispatch(openLoading('apps-list'))
      dispatch(loadApps())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (user.appsStatus === 'loaded' && !user.appsList.length) {
      dispatch(push(appsChoice()))
    }
    if (user.appsStatus !== 'loading') {
      dispatch(closeLoading('apps-list'))
    }
  }, [dispatch, user.appsList.length, user.appsStatus])

  if (!useIsAuthenticated() || !user.categories.length) return null

  return (
    <ScrollablePage>
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
                    i={i + j}
                    key={app.id}
                    icon={app.icon}
                    title={app.title}
                    expanded={app.id in visible}
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
      <Fal to={appsList()} icon={<PracticeIcon />} />
    </ScrollablePage>
  )
}
