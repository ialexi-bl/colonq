import { useRouteMatch } from 'react-router'

export const useCurrentLocation = () => {
  const route = useRouteMatch<{ path?: string }>('/app/:path*')

  if (route?.params.path) {
    return '/' + route.params.path
  }

  return '/'
}
