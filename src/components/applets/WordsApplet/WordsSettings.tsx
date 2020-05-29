import { AppletSettings } from '../AppletSettings'
import { GetSettingsLabel } from '../WordsList/WordEditor'
import { Title } from 'components/shared/Title'
import { WordsList } from 'components/applets/WordsList'
import { WordsManager } from 'services/app-data/WordsManager'
import { useEditAppData } from 'hooks/use-app-data'
import React, { useState } from 'react'

export function getWordSettings(
  manager: WordsManager,
  getSettingsLabel: GetSettingsLabel,
) {
  return function LetterChoiceAppletSettings() {
    const [open, setOpen] = useState(false)
    const { newData, dispatch, apply } = useEditAppData(manager)

    const close = (state: boolean) => {
      if (!state) apply()
      setOpen(state)
    }

    if (!newData) return null
    return (
      <AppletSettings open={open} setOpen={close}>
        <Title level={2}>Список слов</Title>
        <WordsList
          getLabel={getSettingsLabel}
          dispatch={dispatch}
          sets={newData}
        />
      </AppletSettings>
    )
  }
}
