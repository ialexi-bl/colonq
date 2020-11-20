import { TwoLatestDisplay } from './TwoLatestDisplay'
import { useValue } from 'react-cosmos/fixture'
import ChoicePhrase from '../words/ChoicePhrase'
import React from 'react'

const problems = [
  { id: '0', problem: 'транс_европейский', options: ['ъ', 'ь'], answer: 'ъ' },
  { id: '1', problem: 'тюлен_вый', options: ['е', 'и'], answer: 'е' },
  { id: '2', problem: 'угодл_вый', options: ['е', 'и'], answer: 'и' },
  { id: '3', problem: 'удушл_вый', options: ['е', 'и'], answer: 'и' },
]

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [cur, setCur] = useValue<number>('current', { defaultValue: 0 })

  return (
    <TwoLatestDisplay
      current={{
        id: String(cur % 4),
        data: problems[cur % 4],
      }}
      previous={
        cur === 0
          ? null
          : {
              id: String((cur - 1) % 4),
              data: problems[(cur - 1) % 4],
            }
      }
      previous2={
        cur <= 1
          ? null
          : {
              id: String((cur - 2) % 4),
              data: problems[(cur - 2) % 4],
            }
      }
      next={() => setCur((cur) => cur + 1)}
      component={ChoicePhrase}
    />
  )
}
