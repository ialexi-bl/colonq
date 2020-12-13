import { AccentWord, AccentsProblem } from './AccentWord'
import { PRACTICE } from 'apps/hooks/use-lesson'
import { RouteComponentProps } from 'config/routes'
import SessionPage from 'apps/shared/SessionPage'
import WordsSessionPage from 'apps/shared/words/WordsSession'

const APP = 'russian/accents'
export default function Practice(controls: RouteComponentProps) {
  return (
    <SessionPage<AccentsProblem>
      app={APP}
      lesson={PRACTICE}
      render={(problems) => (
        <WordsSessionPage app={APP} problems={problems} wordView={AccentWord} />
      )}
      {...controls}
    />
  )
}
