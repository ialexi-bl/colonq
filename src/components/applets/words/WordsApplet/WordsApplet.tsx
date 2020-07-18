import PageTitle from 'components/shared/PageTitle'
import React, { useState } from 'react'
import WordsAppletContext, { IWordsAppletContext } from './context'

export type { WordsAppletText } from './context'
export type WordsAppletProps = IWordsAppletContext

export default function WordsApplet(props: WordsAppletProps) {
  const [running, setRunning] = useState(false)
  const { icon, title, description } = props

  return (
    <WordsAppletContext.Provider value={props}>
      <PageTitle icon={icon} label={title} />
      <p className={'px-4'}>{description}</p>
    </WordsAppletContext.Provider>
  )
}
