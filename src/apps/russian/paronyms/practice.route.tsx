import { PRACTICE } from 'apps/hooks/use-lesson'
import { Paronym, ParonymsProblem } from './Paronym'
import { RouteComponentProps } from 'config/routes'
import React from 'react'
import SessionPage from 'apps/shared/SessionPage'
import WordsSessionPage from 'apps/shared/words/WordsSession'

const APP = 'russian/paronyms'
export default function Session(controls: RouteComponentProps) {
  return (
    <SessionPage<ParonymsProblem>
      app={APP}
      lesson={PRACTICE}
      render={(problems) => (
        <WordsSessionPage app={APP} problems={problems} wordView={Paronym} />
      )}
      {...controls}
    />
  )
}
