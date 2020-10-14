import React, { ReactNode } from 'react'
import UserService from './UserService'
import UserServiceContext from './context'

export function UserServiceProvider({
  children,
  client,
}: {
  children?: ReactNode
  client: UserService
}) {
  return (
    <UserServiceContext.Provider value={client}>
      {children}
    </UserServiceContext.Provider>
  )
}
