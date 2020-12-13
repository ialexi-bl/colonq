import { AppState } from 'store/types'
import { CUTE_FACE, Elevation } from 'config/view'
import { Category, PlainApp, User, loadApps } from 'store/user'
import { Fal } from 'components/shared/Fab'
import { RouteComponentProps, app as appRoute, appsChoice } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useElevationClassnames } from 'hooks/use-elevation'
import Button from 'components/shared/Button'
import Edit from 'components/icons/Edit'
import LoadingError from 'components/shared/LoadingError'
import PageTitle from 'components/shared/PageTitle'
import React, { useEffect } from 'react'
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
  const user = useSelector((state: AppState) => state.user as User)
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
    )
  }

  return (
    <Wrapper className={elevationCn}>
      <p className={'px-4 mb-12'}>Нажми на тему, чтобы начать занятие</p>

      <div className={'px-4 pb-64'}>
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
      <Fal to={appsChoice()} icon={<Edit />} />
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
    <PageTitle disableBackButton>Темы</PageTitle>
    {children}
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
  <div className={'mb-8'} key={category.id}>
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
          label: 'Уроки & Статистика',
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
