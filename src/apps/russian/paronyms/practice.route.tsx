import { PRACTICE } from 'apps/hooks/use-lesson'
import { Paronym, ParonymsProblem } from './Paronym'
import { RouteComponentProps } from 'config/routes'
import React from 'react'
import WordsSessionPage from 'apps/shared/words/SessionPage'

export default function Session(controls: RouteComponentProps) {
  return (
    <WordsSessionPage<ParonymsProblem>
      app={'russian/paronyms'}
      lesson={PRACTICE}
      wordView={Paronym}
      {...controls}
    />
  )
}
