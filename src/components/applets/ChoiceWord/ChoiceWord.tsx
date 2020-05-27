import { InlineChoice } from 'components/applets/InlineChoice'
import { TwoLatestDisplayViewProps } from 'components/applets/TwoLatestDisplay'
import { Word } from 'services/app-data/WordsManager.types'
import { reduceFont } from 'components/applets/WordsApplet/reduce-font'
import React, { memo, useMemo, useState } from 'react'
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
  extractContent: ExtractContent,
  extractAnswer: ExtractAnswer,
  className?: string,
) {
  return memo(function ChoiceWord({
    item: word,
    active,
    next,
  }: TwoLatestDisplayViewProps<Word>) {
    const [answer, setAnswer] = useState<null | number>(null)
    // const { start, prefix, content, postfix, end } = useMemo(() => {
    //   const [
    //     start = '',
    //     prefix = '',
    //     content,
    //     postfix = '',
    //     end = '',
    //   ] = extractContent(word.label)
    //   return { start, prefix, content, postfix, end }
    // }, [word.label])

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

    const choice = (
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
    )

    function format(row: string) {
      const key = row.slice(0, 8)
      if (!row.includes('[')) {
        return (
          <div key={key} className={styles.ActiveWord}>
            {row}
          </div>
        )
      }

      const [start, end] = row.split(
        new RegExp(`\\s*\\[${content.replace(/(\|)/g, '\\$1')}\\]\\s*`),
      )

      console.log(row.slice(0, 8))
      return (
        <div key={key} className={styles.Row}>
          {start}
          {choice}
          {end}
        </div>
      )
    }
    function align() {
      const { label } = word
      let parts: string[]

      if (label.length <= 20) {
        parts = [word.label]
      } else if (label.length <= 40) {
        parts = getClosestTo(~~(label.length / 2), label)
      } else if (label.length < 100) {
        const third = ~~(label.length / 3)
        const [a, b] = getClosestTo(third, label)
        parts = [a, ...getClosestTo(third, b)]
      } else {
        const fourth = ~~(label.length / 4)
        const [a, b] = getClosestTo(fourth, label)
        const [c, d] = getClosestTo(fourth, b)
        parts = [a, c, ...getClosestTo(fourth, d)]
      }
      console.log(parts)
      return <>{parts.map(format)}</>
    }

    return (
      <div className={cn(styles.Container, className)} ref={reduceFont}>
        {align()}
      </div>
    )
  })
}

const getClosestTo = (n: number, phrase: string) => {
  const words = phrase.split(/\s+/)
  const result = []
  let length = 0
  let ptr = 0

  console.log('starting', n)
  while (length < n && ptr < words.length) {
    result.push(words[ptr])
    length += words[ptr].length
    ptr++
    console.log('res', result)
  }
  return [result.join(' '), words.slice(ptr).join(' ')]
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
