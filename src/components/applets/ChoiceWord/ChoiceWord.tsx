import { InlineChoice } from 'components/applets/InlineChoice'
import { TwoLatestDisplayViewProps } from 'components/applets/TwoLatestDisplay'
import { Word } from 'services/app-data/WordsManager.types'
import { reduceFont } from 'components/applets/WordsApplet/reduce-font'
import React, { memo, useState } from 'react'
import cn from 'clsx'
import styles from './ChoiceWord.module.scss'

type MbString = string | undefined
export type ExtractAnswer = (content: string, options: string[]) => number
export type ExtractContent = (
  word: string,
) => [MbString, MbString, string, MbString, MbString]
export type ChoiceOption =
  | [RegExp | ((content: string, word: Word) => boolean), string[]]
  | ((content: string, word: Word) => false | undefined | string[])
export type ChoiceOptions =
  | ChoiceOption[]
  | ((content: string, word: Word) => string[])

export default function getChoiceWord(
  options: ChoiceOptions,
  extractAnswer: ExtractAnswer,
  className?: string,
) {
  return memo(function ChoiceWord({
    item: word,
    active,
    next,
  }: TwoLatestDisplayViewProps<Word>) {
    const [answer, setAnswer] = useState<null | number>(null)
    const [
      ,
      start = '',
      prefix = '',
      content,
      postfix = '',
      end = '',
    ] = word.label.match(/^([^[]*?)\s*([^[\s]*)\[(.+)\]([^\s]*)\s*(.*)$/)!
    const currentOptions = getOptions(options, content, word)
    const correctAnswer = extractAnswer(content, currentOptions)

    return (
      <div className={cn(styles.Container, className)} ref={reduceFont}>
        {start}
        <div className={styles.ActiveWord}>
          {prefix}
          <InlineChoice
            correctAnswer={correctAnswer}
            options={currentOptions}
            answer={answer}
            active={active}
            onChange={(i) => {
              setAnswer(i)
              next()
            }}
          />
          {postfix}
        </div>
        {end}
      </div>
    )
  })
}

const getOptions = (options: ChoiceOptions, content: string, word: Word) => {
  if (typeof options === 'function') {
    return options(content, word)
  }

  for (const option of options) {
    if (typeof option === 'function') {
      const result = option(content, word)
      if (result) return result
    } else if (
      typeof option[0] === 'function'
        ? option[0](content, word)
        : option[0].test(word.label)
    ) {
      return option[1]
    }
  }
  return ['-']
}
