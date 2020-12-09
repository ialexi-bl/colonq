import { PRACTICE } from 'apps/hooks/use-lesson'
import { RouteComponentProps } from 'config/routes'
import ChoicePhrase, {
  ChoicePhraseProblem,
} from 'components/apps/words/ChoicePhrase'
import React from 'react'
import WordsSessionPage from 'apps/shared/words/SessionPage'

export default function Session(controls: RouteComponentProps) {
  return (
    <WordsSessionPage<ChoicePhraseProblem>
      app={'russian/suffixes'}
      lesson={PRACTICE}
      wordView={ChoicePhrase}
      {...controls}
    />
  )
}
