import { PRACTICE } from 'apps/hooks/use-lesson'
import { RouteComponentProps } from 'config/routes'
import { TrigProblem } from './TrigView'
import SessionPage from 'apps/shared/SessionPage'
import TrigSession from './TrigSession'

const APP = 'math/trigonometry'
export default function Practice(controls: RouteComponentProps) {
  return (
    <SessionPage<TrigProblem>
      app={APP}
      lesson={PRACTICE}
      render={(problems) => <TrigSession problems={problems} />}
      {...controls}
    />
  )
}
