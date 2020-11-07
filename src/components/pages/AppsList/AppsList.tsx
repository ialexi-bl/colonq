import { AppState } from 'store/types'
import { Fal } from 'components/shared/Fab'
import { ScrollablePage } from 'components/shared/Page'
import { User, loadApps } from 'store/user'
import { app as appRoute, appsChoice, appsList } from 'config/routes'
import { closeLoading, openLoading } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from 'components/shared/Accordion'
import Button from 'components/shared/Button'
import DynamicIcon from 'components/icons/DynamicIcon'
import PageTitle from 'components/shared/PageTitle'
import PracticeIcon from 'components/icons/Practice'
import React, { useEffect, useReducer } from 'react'
import ThemeCard from 'components/shared/ThemeCard'
import useIsAuthenticated from 'hooks/use-is-authenticated'

const reducer = (chosen: Record<string, true>, app: string) => {
  const newState = { ...chosen }
  if (newState[app]) delete newState[app]
  else newState[app] = true
  return newState
}

export default function AppsList() {
  const dispatch = useDispatch()
  const [visible, toggleVisible] = useReducer(reducer, {})
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
              {category.apps.map((app, i) => {
                return (
                  <Accordion
                    key={app.id}
                    expanded={app.id in visible}
                    className={'mb-6'}
                    summary={
                      <ThemeCard
                        onClick={() => toggleVisible(app.id)}
                        className={'cursor-pointer'}
                        variant={((i % 4) + 1) as 1}
                        title={app.title}
                        icon={<DynamicIcon icon={app.icon} />}
                      />
                    }
                    details={
                      <div className={'flex flex-col px-6'}>
                        <Button
                          variant={((i % 2) + 1) as 1}
                          onClick={() =>
                            dispatch(push(appRoute(app.id, 'practice')))
                          }
                        >
                          Начать занятие
                        </Button>
                        <Button
                          variant={((i % 2) + 2) as 1}
                          secondary
                          onClick={() =>
                            dispatch(push(appRoute(app.id, 'list')))
                          }
                        >
                          Уроки
                        </Button>
                        <Button
                          variant={i % 2 ? 1 : 3}
                          secondary
                          onClick={() =>
                            dispatch(push(appRoute(app.id, 'settings')))
                          }
                        >
                          Настройки
                        </Button>
                      </div>
                    }
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
