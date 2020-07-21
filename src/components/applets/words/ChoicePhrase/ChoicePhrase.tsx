import {
  InlineChoice,
  InlineChoiceProps,
} from 'components/applets/InlineChoice'
import React from 'react'

export default function ChoicePhrase({
  getOptionsForWord: getOptions,
  phrase,
  ...props
}: ChoicePhraseProps) {
  return (
    <div className={'uppercase text-3xl'}>
      {phrase.split(/\s+/).map((word) => {
        const info = getOptions(word)

        if (!info) {
          return <span>{word} </span>
        }

        return (
          <span className={'whitespace-pre align-middle'}>
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
  getOptionsForWord: GetOptions
  phrase: string
}
export type GetOptions = (
  word: string,
) => null | {
  end?: string
  start?: string
  options: string[]
  correctAnswer: number
}
