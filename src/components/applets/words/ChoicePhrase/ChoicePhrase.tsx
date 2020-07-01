import {
  InlineChoice,
  InlineChoiceProps,
} from 'components/applets/InlineChoice'
import React from 'react'
import styles from './ChoicePhrase.module.scss'

export default function ChoicePhrase({
  getOptions,
  phrase,
  ...props
}: ChoicePhraseProps) {
  return (
    <div>
      {phrase.split(/\s+/).map((word) => {
        const info = getOptions(word)

        if (!info) {
          return <span>{word}</span>
        }

        return (
          <span className={styles.ChoiceWord}>
            {info.start}
            <InlineChoice options={info.options} {...props} />
            {info.end}
          </span>
        )
      })}
    </div>
  )
}

export type ChoicePhraseProps = Omit<InlineChoiceProps, 'options'> & {
  getOptions: GetOptions
  phrase: string
}
export type GetOptions = (
  word: string,
) => null | {
  start?: string
  options: string[]
  end?: string
}
