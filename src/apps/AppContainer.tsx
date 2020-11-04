import AppError from './shared/AppError'
import React, { ReactNode } from 'react'
import useLoadApp from 'hooks/use-load-app'

export type AppProps = {
  id: string
  children?: ReactNode
}

export default function AppContainer({ id, children }: AppProps) {
  const status = useLoadApp(id)

  if (status === 'loading') return null
  if (status === 'error') return <AppError id={id} />

  return <>{children}</>
}
