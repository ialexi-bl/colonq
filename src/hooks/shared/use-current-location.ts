import { useRouteMatch } from 'react-router'

export default function useCurrentLocation() {
  const route = useRouteMatch<{ path?: string }>('/app/:path*')

  if (route?.params.path) {
    return '/' + route.params.path
  }

  return '/'
}
