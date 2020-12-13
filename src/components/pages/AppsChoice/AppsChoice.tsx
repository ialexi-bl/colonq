import { ApiResponse } from 'services/api/config'
import { AppState, MixedDispatch } from 'store/types'
import { AppsApi, UserApi } from 'services/api'
import { Elevation } from 'config/view'
import { RouteComponentProps, appsList } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { executeAuthorizedMethod, loadApps } from 'store/user'
import { notifyErrorObject } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router'
import Accordion from 'components/shared/Accordion/Accordion'
import Continue from 'components/icons/Continue'
import DynamicIcon from 'components/icons/DynamicIcon'
import Fab from 'components/shared/Fab/Fab'
import PageTitle from 'components/shared/PageTitle'
import TextContainer from 'components/shared/TextContainer'
import ThemeCard from 'components/shared/ThemeCard'
import useElevation from 'hooks/use-elevation'
import useIsAuthenticated from 'hooks/use-is-authenticated'
import useItemsToggler from 'hooks/use-items-toggler'

/**
 * Displays page for selecting apps.
 * This component can read `noBack` boolean value from history state,
 * which disables "back" button on the page. Main reason - to prevent
 * user that didn't choose any apps from returning to screen that cannot
 * display anything because apps aren't chosen
 * @param props
 */
export default function AppsChoice({
  visible,
  setProgress,
}: RouteComponentProps) {
  const dispatch = useDispatch<MixedDispatch>()
  const location = useLocation<{ noBack?: boolean } | undefined>()
  const user = useSelector((state: AppState) => state.user)

  const [categories, setCategories] = useState<
    null | ApiResponse.Apps.Category[]
  >(null)
  const [visibleItems, toggleVisible] = useItemsToggler()
  const [chosen, toggle] = useItemsToggler()

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
    if (user.appsStatus !== 'loaded') {
      dispatch(loadApps())
    }
    AppsApi.getAppsList().then((apps) => {
      setCategories(apps.data.categories)
      setProgress(100)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (user.appsStatus !== 'loaded') return

    const chosen: Record<string, true> = {}
    user.categories.forEach((category) => {
      category.apps.forEach((app) => {
        chosen[app.id] = true
      })
    })
    toggle(chosen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, user.appsStatus])
  useElevation(Elevation.appsChoice)

  if (!useIsAuthenticated() || !visible || !categories) {
    return null
  }

  return (
    <ScrollablePage
      routeElevation={Elevation.appsChoice}
      className={'route-overlay bg-page'}
    >
      <PageTitle disableBackButton={location.state?.noBack}>
        Выбор тем
      </PageTitle>
      <p className={'px-4 mb-2'}>
        Выбери темы, которые тебы интересуют. Их можно будет добавить и убрать
        позже.
      </p>
      <p className={'px-4 mb-12'}>
        Нажми на название темы, чтобы посмотреть описание, или на иконку, чтобы
        включить или вылючить её.
      </p>
      <div className={'px-4 pb-64'}>
        {categories.map((category) => (
          <div className={'mb-8'} key={category.id}>
            <h2 className={'text-2xl mb-8'}>{category.title}</h2>

            {category.apps.map((app, i) => (
              <Accordion
                key={app.id}
                expanded={app.id in visibleItems}
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
