import { createContext } from 'react'
import ApiClient from './ApiClient'

const ApiClientContext = createContext<ApiClient>({} as any)
export default ApiClientContext
