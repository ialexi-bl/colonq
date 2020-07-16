import React from 'react'
import Title from 'components/shared/Title'
import WordsAppletManager from 'services/applets/WordsAppletManager'
import WordsEditor from '../WordsEditor'

export type WordsSettingsProps = {
  manager: WordsAppletManager
}
export default function WordsSettings({ manager }: WordsSettingsProps) {
  return (
    <div>
      <Title level={2}>Список слов</Title>
      <WordsEditor manager={manager} />
    </div>
  )
}
