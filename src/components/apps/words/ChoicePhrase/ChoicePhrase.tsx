import { InlineChoice } from 'components/shared/InlineChoice'
import { TwoLatestDisplayViewProps } from 'components/apps/TwoLatestDisplay'
import { WordsNext } from 'apps/shared/words/WordsSession'
import Config from 'config'
import React, { useState } from 'react'

export type ChoicePhraseProblem = {
  id: string
  answer: string
  problem: string
  options: string[]
}

export type ChoicePhraseProps = TwoLatestDisplayViewProps<ChoicePhraseProblem> & {
  next: WordsNext
}
export default function ChoicePhrase({
  item,
  next,
  active,
}: ChoicePhraseProps) {
  const [answer, setAnswer] = useState(-1)

  const [before, after] = item.problem.split('_')
  const [start, prefix] = before.split(/\s*([^\s]*)$/)
  // First element is always an empty string
  const [, postfix, end] = after.split(/^([^\s]*)\s*/)

  if (Config.IS_DEV && item.options.indexOf(item.answer) < 0) {
    console.warn(
      `Correct answer is not one of the options for phrase ${item.id}: ${item.problem}`,
    )
  }

  return (
    <div className={'uppercase text-3xl'}>
      {start}
      <span className={'whitespace-pre align-middle'}>
        {prefix}
        <InlineChoice
          correctAnswer={item.options.indexOf(item.answer)}
          onChange={(answer) => {
            setAnswer(answer)
            next(item.options[answer])
          }}
          options={item.options}
          active={active}
          answer={answer < 0 ? null : answer}
        />
        {postfix}
      </span>
      {end}
    </div>
  )
}
