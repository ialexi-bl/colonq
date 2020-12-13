import { Elevation } from 'config/view'
import { LinkButton } from 'components/shared/Button'
import { RouteComponentProps, appsList } from 'config/routes'
import { useEffect } from 'react'
import Logo from 'components/icons/Logo'
import Page from 'components/shared/Page'
import cn from 'clsx'
import styles from './NotFound.module.scss'
import useElevation from 'hooks/use-elevation'

const NotFound = ({
  setProgress,
}: {
  setProgress?: RouteComponentProps['setProgress']
}) => (
  useElevation(Elevation.notFound),
  useEffect(() => setProgress?.(100), [setProgress]),
  (
    <Page
      routeElevation={Elevation.notFound}
      className={cn(
        'flex flex-col md:flex-row-reverse justify-center items-center',
        'route-overlay bg-page',
      )}
    >
      <div className={'mb-24'}>
        <div className={'flex flex-col text-center mb-8'}>
          <h1 className={'text-4xl mb-2'}>Такой страницы нет</h1>
          <p>ColonQ в недоумении</p>
        </div>
        <Logo className={cn(styles.Monster, 'mx-auto w-48 h-48')} />
      </div>
      <LinkButton to={appsList()} className={'min-w-64'}>
        На главную
      </LinkButton>
    </Page>
  )
)
export default NotFound
