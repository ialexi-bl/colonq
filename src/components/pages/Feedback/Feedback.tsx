import { Elevation } from 'config/view'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'config/routes'
import { useEffect } from 'react'
import Page from 'components/shared/Page'
import useElevation from 'hooks/use-elevation'

export default function Feedback({ setProgress }: RouteComponentProps) {
  useEffect(() => setProgress(100), [setProgress])
  useElevation(Elevation.feedback)

  return (
    <Page
      routeElevation={Elevation.feedback}
      className={'bg-page route-overlay'}
    >
      <Helmet>
        <title>Обратная связь</title>
      </Helmet>
    </Page>
  )
}
