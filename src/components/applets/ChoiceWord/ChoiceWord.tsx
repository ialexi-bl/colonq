import { InlineChoice } from 'components/applets/InlineChoice'
import { TwoLatestDisplayViewProps } from 'components/applets/TwoLatestDisplay'
import { UnknownError } from 'services/errors'
import { Word } from 'services/app-data/WordsAppData.types'
import { reduceFont } from 'components/applets/WordsApplet/reduce-font'
import React, { memo, useMemo, useState } from 'react'
import styles from './ChoiceWord.module.scss'

export type ChoiceOption = [string[], RegExp | ((word: Word) => boolean)]
export type ChoiceOptions = ChoiceOption[]

const getOptions = (options: ChoiceOptions, content: string, word: Word) => {
  if (content.length > 1) {
    return content.toLowerCase().split('')
  }

  const option = options.find((option) => {
    if (typeof option[1] === 'function') return option[1](word)
    return option[1].test(word.label)
  })
  return option?.[0] || ['-']
}
const extractAnswer = (content: string) =>
  content.length === 1
    ? content
    : content.split('').find((x) => x !== x.toLowerCase()) || ''

export default function getChoiceWord(options: ChoiceOptions, regex: RegExp) {
  return memo(function ChoiceWord({
    item: word,
    active,
    next,
  }: TwoLatestDisplayViewProps<Word>) {
    const [answer, setAnswer] = useState<null | number>(null)
    const { start, prefix, content, postfix, end } = useMemo(() => {
      const match = word.label.match(regex)
      if (!match) {
        throw new UnknownError(
          `Failed to parse word ${word.label} with regex ${regex}`,
        )
      }

      const [, before = '', content, after = ''] = match
      const [, start = '', prefix = ''] = before.match(/^(.*?)\s*([^\s]*)$/)!
      const [, postfix = '', end = ''] = after.match(/^([^\s]*)\s*(.*)$/)!
      return { start, prefix, content, postfix, end }
    }, [word.label])

    const currentOptions = getOptions(options, content, word)
    const correctAnswer = currentOptions.indexOf(
      extractAnswer(content).toLowerCase(),
    )

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
