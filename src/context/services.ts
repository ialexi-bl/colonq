import { createContext } from 'react'
import ApiClient from 'services/client'
import AppsService from 'services/apps-service/AppsService'
import UserService from 'services/user-service/UserService'

export type IServicesContext = {
  apiClient: ApiClient
  userService: UserService
  appsService: AppsService
}
export const ServicesContext = createContext<IServicesContext>({} as any)
