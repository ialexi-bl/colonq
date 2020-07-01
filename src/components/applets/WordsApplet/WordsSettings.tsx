import { AppletSettings } from '../AppletSettings'
import { GetSettingsLabel } from '../WordsList/WordEditor'
import { WordsList } from 'components/applets/WordsList'
import { WordsAppletManager } from 'services/applets/WordsAppletManager/WordsAppletManager'
import { useEditAppData } from 'hooks/app-data'
import React, { useState } from 'react'
import Title from 'components/shared/Title'

export function getWordSettings(
  manager: WordsAppletManager,
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
