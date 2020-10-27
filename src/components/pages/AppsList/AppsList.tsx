import { AppState } from 'store/types'
import { Apps, AppsCategories } from 'config/apps'
import { AuthUserState } from 'store/user'
import { ScrollablePage } from 'components/shared/Page'
import { app as appRoute, appSettings, appsChoice } from 'config/routes'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from 'components/shared/Accordion'
import Button from 'components/shared/Button'
import PageTitle from 'components/shared/PageTitle'
import React, { useEffect, useReducer } from 'react'
import ThemeCard from 'components/shared/ThemeCard'
import useIsAuthenticated from 'hooks/shared/use-is-authenticated'

const reducer = (chosen: Record<string, true>, app: string) => {
  const newState = { ...chosen }
  if (newState[app]) delete newState[app]
  else newState[app] = true
  return newState
}

export default function AppsList() {
  const dispatch = useDispatch()
  const [visible, toggleVisible] = useReducer(reducer, {})
  const user = useSelector((state: AppState) => state.user as AuthUserState)

  useEffect(() => {
    console.log(user.status, user.apps.length)
    if (user.status === 'authenticated' && user.apps.length === 0) {
      console.log('here')
      console.log(appsChoice())
      dispatch(push(appsChoice()))
    }
  }, [dispatch, user.apps.length, user.status])

  if (!useIsAuthenticated()) return null

  return (
    <ScrollablePage>
      <PageTitle>Темы</PageTitle>
      <p className={'px-4 mb-12'}>Нажми на тему, чтобы начать занятие</p>

      <div className={'px-4 pb-64'}>
        {AppsCategories.map((category) => {
          if (!category.apps.some((x) => user.apps.includes(x))) {
            return null
          }

          return (
            <div className={'mb-8'} key={category.name}>
              <h2 className={'text-2xl mb-8'}>{category.title}</h2>
              {category.apps.map((appPath, i) => {
                if (!user.apps.includes(appPath)) return null
                const app = Apps[appPath]

                return (
                  <Accordion
                    key={app.name}
                    expanded={appPath in visible}
                    className={'mb-6'}
                    summary={
                      <ThemeCard
                        onClick={() => toggleVisible(appPath)}
                        className={'cursor-pointer'}
                        variant={((i % 4) + 1) as 1}
                        title={app.title}
                        icon={<app.icon />}
                      />
                    }
                    details={
                      <div className={'flex flex-col px-6'}>
                        <Button
                          variant={2}
                          onClick={() =>
                            dispatch(push(appRoute(category.name, app.name)))
                          }
                        >
                          Начать занятие
                        </Button>
                        <Button
                          secondary
                          onClick={() =>
                            dispatch(push(appSettings(category.name, app.name)))
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
    </ScrollablePage>
  )
}
