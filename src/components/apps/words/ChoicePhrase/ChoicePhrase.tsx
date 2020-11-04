import { InlineChoice, InlineChoiceProps } from 'components/shared/InlineChoice'
import React from 'react'

export default function ChoicePhrase({
  parseWord,
  phrase,
  ...props
}: ChoicePhraseProps) {
  return (
    <div className={'uppercase text-3xl'}>
      {phrase.split(/\s+/).map((word) => {
        const info = parseWord(word)

        if (!info) {
          // * Space shall not be removed
          return <span>{word} </span>
        }

        return (
          <span key={word} className={'whitespace-pre align-middle'}>
            {info.start}
            <InlineChoice
              correctAnswer={info.correctAnswer}
              options={info.options}
              {...props}
            />
            {info.end}
          </span>
        )
      })}
    </div>
  )
}

export type ChoicePhraseProps = Omit<
  InlineChoiceProps,
  'options' | 'correctAnswer'
> & {
  parseWord: ParsePhrase
  phrase: string
}
export type PhraseInfo = {
  end?: string
  start?: string
  options: string[]
  correctAnswer: number
}
export type ParsePhrase = (word: string) => null | PhraseInfo
