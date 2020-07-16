import { AppletSettingsProps } from 'components/applets/AppletContainer'
import ControlledScrollbars from 'components/shared/ControlledScrollbars'
import React, { useContext } from 'react'
import Title from 'components/shared/Title'
import WordsAppletContext from './context'
import WordsEditor from '../WordsEditor'

export default function WordsSettings({ backToStart }: AppletSettingsProps) {
  const { manager } = useContext(WordsAppletContext)

  return (
    <ControlledScrollbars>
      <Title level={2}>Список слов</Title>
      <WordsEditor manager={manager} />
    </ControlledScrollbars>
  )
}
