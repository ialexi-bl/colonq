import { AccentWord, AccentsProblem } from './AccentWord'
import { RouteComponentProps } from 'config/routes'
import React from 'react'
import SessionPage from 'apps/shared/SessionPage'
import WordsSessionPage from 'apps/shared/words/WordsSession'

const APP = 'russian/accents'
export default function Session({
  lesson,
  ...controls
}: RouteComponentProps & { lesson: string }) {
  return (
    <SessionPage<AccentsProblem>
      app={APP}
      lesson={lesson}
      render={(problems) => (
        <WordsSessionPage app={APP} problems={problems} wordView={AccentWord} />
      )}
      {...controls}
    />
  )
}
