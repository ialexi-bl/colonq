import { AccentWord, AccentsProblem } from './AccentWord'
import { RouteComponentProps } from 'config/routes'
import React from 'react'
import WordsSessionPage from 'apps/shared/words/SessionPage'

export default function Session({
  lesson: lessonName,
  visible,
  setProgress,
}: RouteComponentProps & { lesson: string }) {
  return (
    <WordsSessionPage<AccentsProblem>
      app={'russian/accents'}
      lesson={lessonName}
      visible={visible}
      wordView={AccentWord}
      setProgress={setProgress}
    />
  )
}
