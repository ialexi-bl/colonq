import { PRACTICE } from 'apps/hooks/use-lesson'
import AccentsSession from './AccentsSession'
import ProblemsProvider from 'apps/shared/ProblemsProvider'
import React from 'react'

export default function Practice() {
  return (
    <ProblemsProvider
      app={'russian/accents'}
      lesson={PRACTICE}
      consumer={AccentsSession}
    />
  )
}
