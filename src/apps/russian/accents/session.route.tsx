import AccentsSession from './AccentsSession'
import ProblemsProvider from 'apps/shared/ProblemsProvider'
import React from 'react'

export default function Session({ lesson }: { lesson: string }) {
  console.log('Session rendering', lesson)
  return (
    <ProblemsProvider
      app={'russian/accents'}
      lesson={lesson}
      consumer={AccentsSession}
    />
  )
}
