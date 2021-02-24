import { Api } from 'core/api/config'
import { AppState, MixedDispatch } from 'store/types'
import { Elevation } from 'config/view'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, appsList } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { loadApps } from 'store/user'
import { notifyErrorObject } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Accordion from 'components/shared/Accordion/Accordion'
import AppsService from 'core/api/services/apps'
import Button from 'components/shared/Button'
import Continue from 'components/icons/Continue'
import Fab from 'components/shared/Fab/Fab'
import LoadingError from 'components/shared/LoadingError'
import PageTitle from 'components/shared/PageTitle'
import TextContainer from 'components/shared/TextContainer'
import ThemeCard from 'components/shared/ThemeCard'
import UserService from 'core/api/services/user'
import useElevation from 'hooks/use-elevation'
import useIconsSet from 'hooks/use-icons-set'
import useIsAuthenticated from 'hooks/use-is-authenticated'
import useItemsToggler, { ToggleList } from 'hooks/use-items-toggler'
import useWasTrue from 'hooks/use-was-true'

/**
 * Displays page for selecting apps.
 * This component can read `noBack` boolean value from history state,
 * which disables "back" button on the page. Main purpose - preventing
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
  const wasError = useWasTrue(user.appsStatus === 'error')
  const Icon = useIconsSet('apps')

  const [categories, setCategories] = useState<
    null | 'error' | 'loading' | Api.Apps.Category[]
  >(null)
  const [visibleItems, toggleVisible] = useItemsToggler()
  const [chosen, toggle] = useItemsToggler()

  const proceed = async () => {
    const apps = Object.keys(chosen)
    if (apps.length === 0) return

    try {
      await UserService.setApps(apps)
      dispatch(push(appsList()))
    } catch (e) {
      dispatch(notifyErrorObject(e))
    }
  }

  const load = () => {
    AppsService.getAppsList()
      .then((apps) => setCategories(apps.data.categories))
      .catch((e) => {
        setCategories('error')
        dispatch(notifyErrorObject(e))
      })
      .then(() => setProgress(100))
  }
  useEffect(() => {
    if (user.appsStatus !== 'loaded') {
      dispatch(loadApps())
    }
    load()
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

  if (
    !useIsAuthenticated() ||
    !visible ||
    !categories ||
    (!wasError && user.appsStatus !== 'loaded')
  ) {
    return null
  }

  if (
    categories === 'error' ||
    categories === 'loading' ||
    user.appsStatus !== 'loaded'
  ) {
    const userAppsFailed = user.appsStatus !== 'loaded'
    return (
      <Wrapper>
        <Helmet>
          <title>Ошибка - Выбор приложений</title>
        </Helmet>
        <LoadingError
          title={'Не удалось загрузить приложения'}
          actions={
            <Button
              disabled={
                userAppsFailed
                  ? user.appsStatus === 'loading'
                  : categories === 'loading'
              }
              onClick={() => {
                if (userAppsFailed) dispatch(loadApps())
                if (categories === 'error') {
                  setCategories('loading')
                  load()
                }
              }}
            >
              Попробовать ещё раз
            </Button>
          }
        />
      </Wrapper>
    )
  }

  const blocked = !hasChosen(chosen)
  return (
    <Wrapper>
      <Helmet>
        <title>Выбор приложений</title>
      </Helmet>
      <PageTitle icon={location.state?.noBack ? null : undefined}>
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
      <div className={'px-4 flex flex-wrap justify-center'}>
        {categories.map((category) => (
          <div className={'mb-8 mx-4 xl:mx-12'} key={category.id}>
            <div className={'flex items-center mb-8'}>
              <h2 className={'text-2xl flex-1'}>{category.title}</h2>
              <button
                onClick={() => {
                  const allEnabled = category.apps.every((x) => chosen[x.id])
                  // Disable all if all enabled, otherwise enable all
                  toggle(appsToObject(category.apps, !allEnabled))
                }}
                className={
                  'text-primary-300 hover:text-primary-200 active:text-primary-400 duration-100'
                }
              >
                Переключить все
              </button>
            </div>

            <div className={'max-w-md xl:max-w-md'}>
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
                      icon={<Icon name={app.icon} />}
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
          </div>
        ))}
      </div>
      <div className={'text-center'}>
        <Button disabled={blocked} onClick={proceed} className={'min-w-48'}>
          Продолжить
        </Button>
      </div>
      <Fab disabled={blocked} onClick={proceed} icon={<Continue />} />
    </Wrapper>
  )
}

const Wrapper = ({ children }: BasicProps) => (
  <ScrollablePage
    routeElevation={Elevation.appsChoice}
    className={'route-overlay bg-page'}
  >
    <div className={'container pb-64'}>{children}</div>
  </ScrollablePage>
)

function appsToObject(apps: Api.Apps.App[], value: boolean) {
  const object: Record<string, boolean> = {}
  apps.forEach((app) => (object[app.id] = value))
  return object
}

function hasChosen(chosen: ToggleList) {
  for (const id in chosen) {
    if (chosen[id]) return true
  }
  return false
}
