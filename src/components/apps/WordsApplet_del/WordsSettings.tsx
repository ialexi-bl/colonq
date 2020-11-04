// @ts-nocheck
/* eslint-disable */
import { GetSettingsLabel } from '../WordsList_del/WordEditor'
import { WordsList } from 'components/apps/WordsList_del'
import { useEditAppData } from 'hooks/app-data'
import React, { useState } from 'react'
import WordsAppletManager from 'services/applets/WordsAppletManager'

export function getWordSettings(
  manager: WordsAppletManager,
  getSettingsLabel: GetSettingsLabel,
) {
  return function LetterChoiceAppletSettings() {
    const [open, _setOpen] = useState(false)
    const { data, dispatch, apply } = useEditAppData(manager)

    const setOpen = (open: boolean) => {
      if (!open) apply()
      _setOpen(open)
    }

    if (!data) return null
    return (
      <AppletSettings open={open} setOpen={setOpen}>
        <Title level={2}>Список слов</Title>
        <WordsList
          getLabel={getSettingsLabel}
          dispatch={dispatch}
          sets={data}
        />
      </AppletSettings>
    )
  }
}
