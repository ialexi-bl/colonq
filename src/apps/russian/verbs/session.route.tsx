import { RouteComponentProps } from 'config/routes'
import ChoicePhrase, {
  ChoicePhraseProblem,
} from 'components/apps/words/ChoicePhrase'
import React from 'react'
import WordsSessionPage from 'apps/shared/words/SessionPage'

export default function Session({
  lesson: lessonName,
  visible,
  setProgress,
}: RouteComponentProps & { lesson: string }) {
  return (
    <WordsSessionPage<ChoicePhraseProblem>
      app={'russian/verbs'}
      lesson={lessonName}
      visible={visible}
      wordView={ChoicePhrase}
      setProgress={setProgress}
    />
  )
}
