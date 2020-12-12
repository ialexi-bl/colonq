import { Paronym, ParonymsProblem } from './Paronym'
import { RouteComponentProps } from 'config/routes'
import React from 'react'
import SessionPage from 'apps/shared/SessionPage'
import WordsSessionPage from 'apps/shared/words/WordsSession'

const APP = 'russian/paronyms'
export default function Session({
  lesson,
  ...controls
}: RouteComponentProps & { lesson: string }) {
  return (
    <SessionPage<ParonymsProblem>
      app={APP}
      lesson={lesson}
      render={(problems) => (
        <WordsSessionPage app={APP} problems={problems} wordView={Paronym} />
      )}
      {...controls}
    />
  )
}
