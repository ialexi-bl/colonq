import { PRACTICE } from 'apps/hooks/use-lesson'
import { RouteComponentProps } from 'config/routes'
import ChoicePhrase, {
  ChoicePhraseProblem,
} from 'apps/shared/words/ChoicePhrase'
import SessionPage from 'apps/shared/SessionPage'
import WordsSessionPage from 'apps/shared/words/WordsSession'

const APP = 'russian/prefixes'
export default function Session(controls: RouteComponentProps) {
  return (
    <SessionPage<ChoicePhraseProblem>
      app={APP}
      lesson={PRACTICE}
      render={(problems) => (
        <WordsSessionPage
          app={APP}
          problems={problems}
          wordView={ChoicePhrase}
        />
      )}
      {...controls}
    />
  )
}
