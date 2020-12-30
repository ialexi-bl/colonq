import { AppState } from 'store/types'
import { useSelector } from 'react-redux'

/**
 * Returns app title if it exists in store, otherwise
 * a placeholder
 * @param app - App ID
 */
export default function useAppTitle(app: string, prefix: string = '- ') {
  const title = useSelector((state: AppState) => state.user.apps[app]?.title)
  return title ? `${prefix}${title}` : ''
}
