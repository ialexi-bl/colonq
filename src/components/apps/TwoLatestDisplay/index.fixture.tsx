import { TwoLatestDisplay } from './TwoLatestDisplay'
import { TwoLatestDisplayViewProps } from './types'
import { useValue } from 'react-cosmos/fixture'
import ChoicePhrase from '../words/ChoicePhrase'
import React, { useState } from 'react'

const phrases = [
  'транс[ьЪ]европейский',
  'тюлен[Еи]вый',
  'угодл[Ие]вый',
  'удушл[Ие]вый',
]

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [cur, setCur] = useValue<number>('current', { defaultValue: 0 })

  return (
    <TwoLatestDisplay
      current={{
        id: String(cur % 4),
        data: phrases[cur % 4],
      }}
      previous={
        cur === 0
          ? null
          : {
              id: String((cur - 1) % 4),
              data: phrases[(cur - 1) % 4],
            }
      }
      previous2={
        cur <= 1
          ? null
          : {
              id: String((cur - 2) % 4),
              data: phrases[(cur - 2) % 4],
            }
      }
      next={() => setCur((cur) => cur + 1)}
      component={Word}
    />
  )
}

function Word({
  item,
  next,
}: TwoLatestDisplayViewProps<string, () => unknown>) {
  const [answer, setAnswer] = useState<undefined | number>(undefined)

  return (
    <ChoicePhrase
      phrase={item}
      answer={answer}
      onChange={(i) => {
        setAnswer(i)
        next()
      }}
      parseWord={(word) => {
        const match = word.match(/(.*?)\[(.+?)\](.*)/)

        return (
          match && {
            end: match[3],
            start: match[1],
            options: match[2].toLowerCase().split(''),
            correctAnswer: match[2].indexOf(
              match[2].split('').find((x) => x !== x.toLowerCase())!,
            ),
          }
        )
      }}
    />
  )
}
