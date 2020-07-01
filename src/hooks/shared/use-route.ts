import { routes } from 'config/routes'
import { useRouteMatch } from 'react-router'

export default function useMatch() {
  const match = useRouteMatch()

  if (!(match.path in routes)) {
    return null
  }

  return routes[match.path]
}
