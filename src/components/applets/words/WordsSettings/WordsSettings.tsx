import React from 'react'
import WordsAppletManager from 'services/applets/WordsAppletManager'
import WordsEditor from '../WordsEditor'

export type WordsSettingsProps = {
  manager: WordsAppletManager
}
export default function WordsSettings({ manager }: WordsSettingsProps) {
  return (
    <div>
      <h2>Список слов</h2>
      <WordsEditor manager={manager} />
    </div>
  )
}
