import { AppState } from 'store/types'
import { useSelector } from 'react-redux'

/**
 * Returns app title if it exists in store, otherwise
 * a placeholder
 * @param app - App ID
 */
export default function useAppTitle(
  app: string,
  placeholder: string | null = null,
) {
  const title = useSelector(
    (state: AppState) => state.user.apps[app]?.title || placeholder,
  )
  return title && `- ${title}`
}
