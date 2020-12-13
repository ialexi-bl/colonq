import { Elevation } from 'config/view'
import { Fal } from 'components/shared/Fab'
import { RouteComponentProps, app as appRoute } from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { useEffect } from 'react'
import { useElevationClassnames } from 'hooks/use-elevation'
import AppError from '../AppError'
import List from 'components/icons/List'
import PageTitle from 'components/shared/PageTitle'
import Settings from './Settings'
import cn from 'clsx'
import useSettings from './use-settings'

export type SettingsProps = RouteComponentProps & {
  app: string
}

export default function SettingsPage({
  app,
  visible,
  setProgress,
}: SettingsProps) {
  const settings = useSettings(app)
  const elevationCn = useElevationClassnames(Elevation.appsSettings, {
    above: 'overlay',
    same: 'right',
  })

  useEffect(() => {
    if (settings.status !== 'loading') {
      setProgress(100)
    }
  }, [setProgress, settings.status])

  if (!visible || settings.status === 'loading') return null
  if (settings.status !== 'loaded') {
    return (
      <Wrapper className={elevationCn}>
        <AppError
          id={app}
          type={'unknown'}
          retry={settings.retry}
          retrying={settings.status === 'retrying'}
        />
      </Wrapper>
    )
  }

  return (
    <Wrapper className={elevationCn}>
      <PageTitle>Найтройки приложения</PageTitle>
      <Settings app={app} settings={settings.settings} />

      <Fal
        to={appRoute(app, 'stats')}
        icon={
          <span className={'p-2 block'}>
            <List />
          </span>
        }
      />
    </Wrapper>
  )
}

const Wrapper = ({ className, children }: BasicProps) => (
  <ScrollablePage
    routeElevation={Elevation.appsSettings}
    className={cn('bg-page', className)}
  >
    {children}
  </ScrollablePage>
)
