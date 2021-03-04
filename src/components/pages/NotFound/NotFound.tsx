import { Elevation } from 'config/view'
import { Helmet } from 'react-helmet'
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
        'flex flex-col justify-center items-center',
        'route-overlay bg-page',
      )}
    >
      <Helmet>
        <title>Страница не найдена</title>
      </Helmet>
      <h1 className={'text-4xl mb-6'}>Такой страницы нет</h1>
      <Logo className={cn(styles.Monster, 'mx-auto mb-6 w-48 h-48')} />
      <LinkButton to={appsList()} className={'min-w-64'}>
        На главную
      </LinkButton>
    </Page>
  )
)
export default NotFound
