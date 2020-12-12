import { RouteComponentProps } from 'config/routes'
import { TrigProblem } from './TrigView'
import React from 'react'
import SessionPage from 'apps/shared/SessionPage'
import TrigSession from './TrigSession'

const APP = 'math/trigonometry'
export default function Session({
  lesson,
  ...controls
}: RouteComponentProps & { lesson: string }) {
  return (
    <SessionPage<TrigProblem>
      app={APP}
      lesson={lesson}
      render={(problems) => <TrigSession problems={problems} />}
      {...controls}
    />
  )
}
