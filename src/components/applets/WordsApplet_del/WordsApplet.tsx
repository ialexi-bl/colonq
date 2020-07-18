// @ts-nocheck
/* eslint-disable */
import { APPLET_LOADING } from 'components/pages/Applet'
import { CleanButton } from 'components/shared/Button'
import { GetSettingsLabel } from '../WordsList_del/WordEditor'
import Hide from 'components/icons/DisableProblem'
import {
  TwoLatestDisplay,
  TwoLatestDisplayViewProps,
} from 'components/applets/TwoLatestDisplay'
import { Word } from 'services/applets/WordsAppletManager/types'
import { cssUtil } from 'styles'
import { getWordSettings } from './WordsSettings'
import { hideLoading } from 'store/view'
import { useDispatch } from 'react-redux'
import { useUpdateAppData } from 'hooks/app-data'
import { useWords } from './use-words'
import React, { ComponentType } from 'react'
import WordsAppletManager from 'services/applets/WordsAppletManager'
import cn from 'clsx'
import styles from './WordsApplet.module.scss'

export type WordComponent = React.ComponentType<TwoLatestDisplayViewProps<Word>>
export type LetterChoiceAppletOptions = {
  word: WordComponent
  manager: WordsAppletManager
  className?: string
  help?: ComponentType
  getSettingsLabel: GetSettingsLabel
}

export function createWordsApplet({
  word: Word,
  help: Help = () => null,
  manager,
  className,
  getSettingsLabel,
}: LetterChoiceAppletOptions) {
  const Settings = getWordSettings(manager, getSettingsLabel)

  return function WordsApplet() {
    const dispatchGlobally = useDispatch()
    const { dispatch } = useUpdateAppData(manager)
    const { loading, words, next } = useWords(manager, () => {
      dispatchGlobally(hideLoading(APPLET_LOADING))
    })

    if (loading) {
      return null
    }

    return (
      <div className={cn(styles.Container, className)}>
        <Settings />
        <Help />

        {words.current === null ? (
          <NoWords className={cssUtil.routeTransitionDown} />
        ) : (
          <TwoLatestDisplay
            className={cssUtil.routeTransitionDown}
            component={Word}
            words={words}
            next={next}
          />
        )}
        <CleanButton
          title={'Не показывать'}
          className={cn(cssUtil.routeTransitionOpacity, styles.Hide)}
          onClick={() => {
            const { current: currentItem } = words
            if (!currentItem) return

            const { data: word } = currentItem
            next(true)
            dispatch({
              type: 'toggle-item',
              payload: {
                groupIndex: word.groupIndex,
                itemIndex: word.id,
              },
            })
          }}
        >
          <Hide />
        </CleanButton>
      </div>
    )
  }
}