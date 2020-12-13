import { RouteComponentProps } from 'config/routes'
import ChoicePhrase, {
  ChoicePhraseProblem,
} from 'components/apps/words/ChoicePhrase'
import SessionPage from 'apps/shared/SessionPage'
import WordsSessionPage from 'apps/shared/words/WordsSession'

const APP = 'russian/verbs'
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
