import { createContext } from 'react'
import ApiClient from './ApiClient'

const ApiClientContext = createContext<ApiClient>(new ApiClient())
export default ApiClientContext
