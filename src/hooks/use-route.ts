import { routes } from 'config/routes'
import { useLocation } from 'react-router'

export default function useRoute() {
  const location = useLocation()

  if (!(location.pathname in routes)) {
    return null
  }

  return routes[location.pathname]
}
