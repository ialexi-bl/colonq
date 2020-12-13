import { RouteComponentProps } from 'config/routes'
import { useEffect } from 'react'
import LoadingError from 'components/shared/LoadingError'

export type LoadingErrorPageProps = RouteComponentProps & {
  retry: () => unknown
}
export default function LoadingErrorPage({
  retry,
  setProgress,
}: LoadingErrorPageProps) {
  useEffect(() => setProgress(100), [setProgress])
  return <LoadingError />
}
