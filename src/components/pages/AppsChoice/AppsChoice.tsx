import { ApiResponse } from 'services/client/config'
import { AppState, MixedDispatch } from 'store/types'
import { AppsApi, UserApi } from 'services/api'
import { ScrollablePage } from 'components/shared/Page'
import { appsList } from 'config/routes'
import { closeLoading, notifyErrorObject, openLoading } from 'store/view'
import { executeAuthorizedMethod } from 'store/user'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from 'components/shared/Accordion/Accordion'
import Continue from 'components/icons/Continue'
import DynamicIcon from 'components/icons/DynamicIcon'
import Fab from 'components/shared/Fab/Fab'
import PageTitle from 'components/shared/PageTitle'
import React, { useEffect, useState } from 'react'
import TextContainer from 'components/shared/TextContainer'
import ThemeCard from 'components/shared/ThemeCard'
import useIsAuthenticated from 'hooks/use-is-authenticated'
import useItemsToggler from 'hooks/use-items-toggler'

export default function AppsChoice() {
  const dispatch = useDispatch<MixedDispatch>()
  const user = useSelector((state: AppState) => state.user)

  const [categories, setCategories] = useState<
    null | ApiResponse.Apps.Category[]
  >(null)
  const [visible, toggleVisible] = useItemsToggler()
  const [chosen, toggle] = useItemsToggler(() => {
    const chosen: Record<string, true> = {}
    if (user.token) {
      user.categories.forEach((category) => {
        category.apps.forEach((app) => {
          chosen[app.id] = true
        })
      })
    }
    return chosen
  })

  const proceed = async () => {
    const apps = Object.keys(chosen)
    if (apps.length === 0) return

    try {
      await dispatch(executeAuthorizedMethod(UserApi.setApps(apps)))
      dispatch(push(appsList()))
    } catch (e) {
      dispatch(notifyErrorObject(e))
    }
  }

  useEffect(() => {
    dispatch(openLoading('apps-choice'))
    AppsApi.getAppsList().then((apps) => {
      setCategories(apps.data.categories)
      dispatch(closeLoading('apps-choice'))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!useIsAuthenticated() || !categories) {
    return null
  }

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
        {categories.map((category) => (
          <div className={'mb-8'} key={category.id}>
            <h2 className={'text-2xl mb-8'}>{category.title}</h2>

            {category.apps.map((app, i) => (
              <Accordion
                key={app.id}
                expanded={app.id in visible}
                className={'mb-6'}
                summary={
                  <ThemeCard
                    onTextClick={() => toggleVisible(app.id)}
                    onIconClick={() => toggle(app.id)}
                    className={'cursor-pointer'}
                    disabled={!chosen[app.id]}
                    variant={((i % 4) + 1) as 1}
                    title={app.title}
                    icon={<DynamicIcon icon={app.icon} />}
                  />
                }
                details={
                  <TextContainer variant={((i % 3) + 1) as 1}>
                    {/* TODO: send description */}
                    {app.description}
                  </TextContainer>
                }
              />
            ))}
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
