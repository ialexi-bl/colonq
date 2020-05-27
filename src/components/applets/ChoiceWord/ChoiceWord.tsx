import { InlineChoice } from 'components/applets/InlineChoice'
import { TwoLatestDisplayViewProps } from 'components/applets/TwoLatestDisplay'
import { Word } from 'services/app-data/WordsManager.types'
import { reduceFont } from 'components/applets/WordsApplet/reduce-font'
import React, { memo, useMemo, useState } from 'react'
import styles from './ChoiceWord.module.scss'

type MbString = string | undefined
export type ExtractAnswer = (content: string, options: string[]) => number
export type ExtractContent = (word: string) => [MbString, string, MbString]
export type ChoiceOption = [
  string[],
  RegExp | ((content: string, word: Word) => boolean),
]
export type ChoiceOptions =
  | ChoiceOption[]
  | ((content: string, word: Word) => string[])

export default function getChoiceWord(
  options: ChoiceOptions,
  extractContent: ExtractContent,
  extractAnswer: ExtractAnswer,
) {
  return memo(function ChoiceWord({
    item: word,
    active,
    next,
  }: TwoLatestDisplayViewProps<Word>) {
    const [answer, setAnswer] = useState<null | number>(null)
    const { start, prefix, content, postfix, end } = useMemo(() => {
      const [before = '', content, after = ''] = extractContent(word.label)
      const [, start = '', prefix = ''] = before.match(/^(.*?)\s*([^\s]*)$/)!
      const [, postfix = '', end = ''] = after.match(/^([^\s]*)\s*(.*)$/)!
      return { start, prefix, content, postfix, end }
    }, [word.label])

    const currentOptions = getOptions(options, content, word)
    const correctAnswer = extractAnswer(content, currentOptions)

    return (
      <div className={styles.Container} ref={reduceFont}>
        {start}
        <div className={styles.InteractiveWord}>
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
  if (content.length > 1) {
    return content.toLowerCase().split('')
  }
  if (typeof options === 'function') {
    return options(content, word)
  }

  const option = options.find((option) => {
    if (typeof option[1] === 'function') {
      return option[1](content, word)
    }
    return option[1].test(word.label)
  })
  return option?.[0] || ['-']
}
