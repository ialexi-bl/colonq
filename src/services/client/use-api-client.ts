import { useContext } from 'react'
import ApiClientContext from './context'

export default function useApiClient() {
  return useContext(ApiClientContext)
}
