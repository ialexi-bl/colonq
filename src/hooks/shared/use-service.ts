import { ServicesContext } from 'context/services'
import { useContext } from 'react'

export function useApiClient() {
  return useContext(ServicesContext).apiClient
}

export function useUserService() {
  return useContext(ServicesContext).userService
}

export function useAppsService() {
  return useContext(ServicesContext).appsService
}
