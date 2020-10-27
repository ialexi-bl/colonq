import { Apps, AppsCategories } from 'config/apps'
import { ScrollablePage } from 'components/shared/Page'
import { appsList } from 'config/routes'
import { notifyErrorObject } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useUserService } from 'services/user-service'
import Accordion from 'components/shared/Accordion/Accordion'
import Continue from 'components/icons/Continue'
import Fab from 'components/shared/Fab/Fab'
import PageTitle from 'components/shared/PageTitle'
import React, { useReducer } from 'react'
import TextContainer from 'components/shared/TextContainer'
import ThemeCard from 'components/shared/ThemeCard'
import useIsAuthenticated from 'hooks/shared/use-is-authenticated'

const reducer = (chosen: Record<string, true>, app: string) => {
  const newState = { ...chosen }
  if (newState[app]) delete newState[app]
  else newState[app] = true
  return newState
}

export default function AppsChoice() {
  const dispatch = useDispatch()
  const userService = useUserService()

  const [chosen, toggle] = useReducer(reducer, {})
  const [visible, toggleVisible] = useReducer(reducer, {})

  const proceed = async () => {
    const apps = Object.keys(chosen)
    if (apps.length === 0) return

    try {
      await userService.setApps(apps)
      dispatch(push(appsList()))
    } catch (e) {
      console.log(e)
      dispatch(notifyErrorObject(e))
    }
  }

  if (!useIsAuthenticated()) return null

  return (
    <ScrollablePage>
      <PageTitle>Выбор тем</PageTitle>
      <p className={'px-4 mb-2'}>
        Выбери темы, по которым ты хочешь заниматься. Их можно будет добавить и
        убрать позже.
      </p>
      <p className={'px-4 mb-12'}>
        Нажми на название темы, чтобы посмотреть описание, и на иконку, чтобы
        включить или вылючить её.
      </p>
      <div className={'px-4 pb-64'}>
        {AppsCategories.map((category) => (
          <div className={'mb-8'} key={category.name}>
            <h2 className={'text-2xl mb-8'}>{category.title}</h2>

            {category.apps.map((appPath, i) => {
              const app = Apps[appPath]

              return (
                <Accordion
                  key={app.name}
                  expanded={appPath in visible}
                  className={'mb-6'}
                  summary={
                    <ThemeCard
                      onTextClick={() => toggleVisible(appPath)}
                      onIconClick={() => toggle(appPath)}
                      className={'cursor-pointer'}
                      disabled={!chosen[appPath]}
                      variant={((i % 4) + 1) as 1}
                      title={app.title}
                      icon={<app.icon />}
                    />
                  }
                  details={
                    <TextContainer variant={((i % 3) + 1) as 1}>
                      {app.description}
                    </TextContainer>
                  }
                />
              )
            })}
          </div>
        ))}
        <Fab
          disabled={Object.keys(chosen).length === 0}
          onClick={proceed}
          icon={<Continue />}
        />
      </div>
    </ScrollablePage>
  )
}
