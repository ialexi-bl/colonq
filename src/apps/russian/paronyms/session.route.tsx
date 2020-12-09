import { Paronym, ParonymsProblem } from './Paronym'
import { RouteComponentProps } from 'config/routes'
import React from 'react'
import WordsSessionPage from 'apps/shared/words/SessionPage'

export default function Session({
  lesson: lessonName,
  ...controls
}: RouteComponentProps & { lesson: string }) {
  return (
    <WordsSessionPage<ParonymsProblem>
      app={'russian/paronyms'}
      lesson={lessonName}
      wordView={Paronym}
      {...controls}
    />
  )
}
