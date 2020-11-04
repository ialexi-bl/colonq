import AppError from 'apps/shared/AppError'
import NotFound from 'components/pages/NotFound'
import React from 'react'

export type SessionProps = {
  app: string
  status: 'loading' | 'error' | 'not-found'
}
export default function LessonSuspense({ status, app }: SessionProps) {
  switch (status) {
    case 'error':
      return <AppError id={app} />
    case 'not-found':
      // TODO: be more precise
      return <NotFound />
    case 'loading':
    default:
      return null
  }
}
