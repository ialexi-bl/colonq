import { AppState } from 'store/types'
import { CUTE_FACE, Elevation } from 'config/view'
import { Category, PlainApp, loadApps } from 'store/user'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, app as appRoute, appsChoice } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useElevationClassnames } from 'hooks/use-elevation'
import Button, { LinkButton } from 'components/shared/Button'
import LoadingError from 'components/shared/LoadingError'
import PageTitle from 'components/shared/PageTitle'
import ThemeActionItem, {
  ActionDescription,
} from 'components/shared/ThemeActionItem'
import cn from 'clsx'
import useIsAuthenticated from 'hooks/use-is-authenticated'
import useItemsToggler from 'hooks/use-items-toggler'
import useWasTrue from 'hooks/use-was-true'

export default function AppsList({
  visible,
  setProgress,
}: RouteComponentProps) {
  const [visibleItems, toggleVisible] = useItemsToggler()
  const dispatch = useDispatch()
  const user = useSelector((state: AppState) => state.user)
  const hadError = useWasTrue(user.appsStatus === 'error')

  useEffect(() => {
    if (user.appsStatus !== 'loaded') {
      dispatch(loadApps())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user.appsStatus === 'loaded' && !user.appsList.length) {
      dispatch(push(appsChoice(), { noBack: true }))
    }
    if (user.appsStatus === 'loaded' || user.appsStatus === 'error') {
      setProgress(100)
    }
  }, [dispatch, setProgress, user])

  const elevationCn = useElevationClassnames(Elevation.appsList, {
    same: 'left',
  })
  useIsAuthenticated()
  if (!visible || (user.appsStatus === 'loaded' && !user.categories.length)) {
    return null
  }

  if (hadError && user.appsStatus !== 'loaded') {
    return (
      <>
        <Helmet>
          <title>Ошибка - Список приложений</title>
        </Helmet>
        <LoadingError
          className={elevationCn}
          title={`Не удалось загрузить приложения ${CUTE_FACE}`}
          actions={
            <Button
              className={'min-w-64'}
              disabled={user.appsStatus !== 'error'}
              onClick={() => dispatch(loadApps())}
            >
              Попробовать ещё раз
            </Button>
          }
        />
      </>
    )
  }

  return (
    <Wrapper className={elevationCn}>
      <Helmet>
        <title>Список приложений</title>
      </Helmet>
      <p className={'px-4 mb-12'}>Нажми на тему, чтобы начать занятие</p>

      <div className={'px-4 pb-64 mx-auto'}>
        <div className={'flex justify-center flex-wrap'}>
          {user.categories.map((category) => {
            return (
              <CategoryItem
                key={category.id}
                category={category}
                toggleVisible={toggleVisible}
                visibleItems={visibleItems}
              />
            )
          })}
        </div>
        <div className={'flex justify-center mt-8'}>
          <LinkButton
            className={'min-w-48 mx-auto'}
            to={appsChoice()}
            secondary
          >
            Изменить
          </LinkButton>
        </div>
      </div>
    </Wrapper>
  )
}

// =======================
//   COSMETIC COMPONENTS
// =======================

const Wrapper = ({ className, children }: BasicProps) => (
  <ScrollablePage
    routeElevation={Elevation.appsList}
    className={cn('bg-page', className)}
  >
    <div className={'container'}>
      <PageTitle icon={null}>Темы</PageTitle>
      {children}
    </div>
  </ScrollablePage>
)

const CategoryItem = ({
  category,
  visibleItems,
  toggleVisible,
}: {
  category: Category
  visibleItems: Record<string, boolean>
  toggleVisible: (id: string) => void
}) => (
  <div className={'mb-8 mx-4 max-w-md xl:max-w-md xl:mx-12'} key={category.id}>
    <h2 className={'text-2xl mb-8'}>{category.title}</h2>
    {category.apps.map((app) => {
      return (
        <AppItem
          app={app}
          key={app.id}
          toggleVisible={toggleVisible}
          expanded={app.id in visibleItems}
        />
      )
    })}
  </div>
)
const AppItem = ({
  app,
  expanded,
  toggleVisible,
}: {
  app: PlainApp
  expanded: boolean
  toggleVisible: (id: string) => void
}) => {
  const dispatch = useDispatch()
  return (
    <ThemeActionItem
      icon={app.icon}
      title={app.title}
      progress={app.score / 100}
      expanded={expanded}
      className={'mb-6'}
      toggleVisible={() => toggleVisible(app.id)}
      actions={[
        {
          id: 0,
          primary: true,
          label: 'Начать занятие',
          action: () => dispatch(push(appRoute(app.id, 'practice'))),
        } as ActionDescription,
        {
          id: 1,
          label: 'Список уроков',
          action: () => dispatch(push(appRoute(app.id, 'stats'))),
        },
        app.hasSettings && {
          id: 2,
          label: 'Настройки',
          action: () => dispatch(push(appRoute(app.id, 'settings'))),
        },
      ].filter((x: any): x is ActionDescription => x)}
    />
  )
}
