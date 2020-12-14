import { RouteComponentProps } from 'config/routes'
import ChoicePhrase, {
  ChoicePhraseProblem,
} from 'apps/shared/words/ChoicePhrase'
import SessionPage from 'apps/shared/SessionPage'
import WordsSessionPage from 'apps/shared/words/WordsSession'

const APP = 'russian/suffixes'
export default function Session({
  lesson,
  ...controls
}: RouteComponentProps & { lesson: string }) {
  return (
    <SessionPage<ChoicePhraseProblem>
      app={APP}
      lesson={lesson}
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
