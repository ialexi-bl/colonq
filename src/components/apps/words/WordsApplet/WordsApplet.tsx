import React, { useState } from 'react'
import WordsAppletContext, { IWordsAppletContext } from './context'
import WordsSession from './WordsSession'
import WordsStartScreen from './WordsStartScreen'

export type { WordsAppletText } from './context'
export type WordsAppletProps = IWordsAppletContext

export default function WordsApplet(props: WordsAppletProps) {
  const [running, setRunning] = useState(false)

  return (
    <WordsAppletContext.Provider value={props}>
      <WordsStartScreen running={running} start={() => setRunning(true)} />
      <WordsSession running={running} finish={() => setRunning(false)} />
    </WordsAppletContext.Provider>
  )
}
