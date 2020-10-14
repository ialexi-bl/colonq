import { useContext } from 'react'
import UserServiceContext from './context'

export function useUserService() {
  return useContext(UserServiceContext)
}
