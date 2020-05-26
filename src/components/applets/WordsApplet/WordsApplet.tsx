import { APPLET_LOADING } from 'components/pages/Applet'
import { CleanButton } from 'components/shared/Button'
import { Hide } from 'components/icons/Hide'
import { NoWords } from 'components/applets/NoWords'
import {
  TwoLatestDisplay,
  TwoLatestDisplayViewProps,
} from 'components/applets/TwoLatestDisplay'
import { Word } from 'services/app-data/WordsAppData.types'
import { WordsManager } from 'services/app-data/WordsManager'
import { cssUtil } from 'styles'
import { getWordSettings } from './WordsSettings'
import { hideLoading } from 'store/view'
import { useDispatch } from 'react-redux'
import { useUpdateAppData } from 'hooks/use-app-data'
import { useWords } from './use-words'
import React from 'react'
import cn from 'clsx'

import styles from './WordsApplet.module.scss'

export type WordComponent = React.ComponentType<TwoLatestDisplayViewProps<Word>>
export type LetterChoiceAppletOptions = {
  word: WordComponent
  manager: WordsManager
}

export function createWordsApplet({
  word: Word,
  manager,
}: LetterChoiceAppletOptions) {
  const Settings = getWordSettings(manager)

  return function WordsApplet() {
    const dispatchGlobally = useDispatch()
    const { dispatch } = useUpdateAppData(manager)
    const { loading, words, next } = useWords(manager, () => {
      // console.log('loaded')
      dispatchGlobally(hideLoading(APPLET_LOADING))
    })

    if (loading) {
      return null
    }

    return (
      <div className={cn(cssUtil.centered, styles.Container)}>
        <Settings />
        <div className={cn(cssUtil.routeTransitionUp, styles.WordsContainer)}>
          {words.current === null ? (
            <NoWords />
          ) : (
            <TwoLatestDisplay component={Word} words={words} next={next} />
          )}
        </div>
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
                setIndex: word.setId,
                index: word.id,
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
