import { AccentWord, AccentsProblem } from './AccentWord'
import { PRACTICE } from 'apps/hooks/use-lesson'
import { RouteComponentProps } from 'config/routes'
import React from 'react'
import WordsSessionPage from 'apps/shared/words/SessionPage'

export default function Practice(controls: RouteComponentProps) {
  return (
    <WordsSessionPage<AccentsProblem>
      app={'russian/accents'}
      lesson={PRACTICE}
      wordView={AccentWord}
      {...controls}
    />
  )
}
