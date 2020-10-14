import { useContext } from 'react'
import ApiClientContext from './context'

export function useApiClient() {
  return useContext(ApiClientContext)
}
