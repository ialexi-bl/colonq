import React from 'react'
import { ReactNode } from 'react'
import ApiClient from './ApiClient'
import ApiClientContext from './context'

const apiClient = new ApiClient()

export default function ApiClientProvider({
  children,
}: {
  children?: ReactNode
}) {
  return (
    <ApiClientContext.Provider value={apiClient}>
      {children}
    </ApiClientContext.Provider>
  )
}
