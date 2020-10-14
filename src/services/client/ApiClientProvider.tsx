import ApiClient from './ApiClient'
import ApiClientContext from './context'
import React, { ReactNode } from 'react'

export function ApiClientProvider({
  children,
  client,
}: {
  children?: ReactNode
  client: ApiClient
}) {
  return (
    <ApiClientContext.Provider value={client}>
      {children}
    </ApiClientContext.Provider>
  )
}
