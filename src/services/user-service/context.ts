import { createContext } from 'react'
import UserService from './UserService'

const UserServiceContext = createContext<UserService>({} as any)
export default UserServiceContext
