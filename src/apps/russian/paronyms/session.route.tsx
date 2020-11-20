import { Paronym, ParonymsProblem } from './Paronym'
import { RouteComponentProps } from 'config/routes'
import React from 'react'
import WordsSessionPage from 'apps/shared/words/SessionPage'

export default function Session({
  lesson: lessonName,
  visible,
  setProgress,
}: RouteComponentProps & { lesson: string }) {
  return (
    <WordsSessionPage<ParonymsProblem>
      app={'russian/paronyms'}
      lesson={lessonName}
      visible={visible}
      wordView={Paronym}
      setProgress={setProgress}
    />
  )
}
