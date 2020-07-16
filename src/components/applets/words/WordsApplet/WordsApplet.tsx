import AppletContainer from 'components/applets/AppletContainer'
import React from 'react'
import WordsAppletContext, { IWordsAppletContext } from './context'
import WordsSession from './WordsSession'
import WordsSettings from './WordsSettings'
import WordsStartScreen from './WordsStartScreen'

export type { WordsAppletText } from './context'
export type WordsAppletProps = IWordsAppletContext

export default function WordsApplet(props: WordsAppletProps) {
  return (
    <WordsAppletContext.Provider value={props}>
      <AppletContainer
        settings={WordsSettings}
        session={WordsSession}
        start={WordsStartScreen}
      />
    </WordsAppletContext.Provider>
  )
}
