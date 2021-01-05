import { CUTE_FACE, Elevation } from 'config/view'
import { RouteComponentProps } from 'config/routes'
import { useEffect, useState } from 'react'
import Button from 'components/shared/Button'
import LoadingError from 'components/shared/LoadingError'
import Page from 'components/shared/Page'

export type LoadingErrorPageProps = RouteComponentProps & {
  retry: () => Promise<unknown>
}

export default function LoadingErrorPage({
  retry,
  setProgress,
}: LoadingErrorPageProps) {
  const [retrying, setRetrying] = useState(false)
  useEffect(() => setProgress(100), [setProgress])

  return (
    <Page
      routeElevation={Elevation.notFound}
      className={'bg-page route-overlay'}
    >
      <LoadingError
        title={`Не удалось загрузить страницу ${CUTE_FACE}`}
        actions={
          <Button
            disabled={retrying}
            onClick={() => {
              setRetrying(true)
              retry().then(() => setRetrying(false))
            }}
            className={'min-w-64'}
            variant={2}
          >
            Попробовать ещё раз
          </Button>
        }
      />
    </Page>
  )
}
