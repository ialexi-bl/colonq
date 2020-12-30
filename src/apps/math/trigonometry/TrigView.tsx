import { TwoLatestDisplayViewProps } from 'components/shared/TwoLatestDisplay'
import { WordsNext } from 'apps/shared/words/WordsSession'
import { memo } from 'react'
import Oval from 'components/shared/Oval/Oval'
import TrigAnswer from './TrigAnswer'
import TrigExpression, { Fraction } from './TrigExpression'
import cn from 'clsx'

/**
 * @example
 * {
 *   id: 'sin-0',
 *   answer: 'sqrt3/2',
 *   problem: ['sin', 'π/2']
 * }
 */
export type TrigProblem = {
  id: string
  value: TrigAnswer
  answer: string
  problem: [string, string]
}

export type TrigViewProps = TwoLatestDisplayViewProps<TrigProblem> & {
  next: WordsNext<string>
  correct?: boolean
}
export default function TrigView({ correct, item, active }: TrigViewProps) {
  return (
    <div
      className={cn(
        'text-5xl flex items-center transform duration-200',
        active || correct ? 'translate-x-16' : 'translate-x-8',
      )}
    >
      <span className={'block mr-2'}>{item.problem[0]}</span>
      <Argument value={item.problem[1]} />
      <span className={'mx-2'}>=</span>
      <Oval
        className={cn(
          'min-w-16 mr-3 duration-200',
          (active || correct) && 'opacity-0',
        )}
        state={'correct'}
      >
        <TrigExpression
          active={active}
          value={TrigAnswer.fromString(item.answer)}
        />
      </Oval>
      <Oval
        className={cn(
          'min-w-16 transform duration-200',
          active ? '-translate-x-24' : correct && '-translate-x-20',
        )}
        state={active ? 'invisible' : correct ? 'correct' : 'incorrect'}
      >
        <TrigExpression active={active} value={item.value} />
      </Oval>
    </div>
  )
}

const Argument = memo(function Argument({ value }: { value: string }) {
  const parts = value.split('/')

  if (parts.length <= 1) {
    return <span>{value}</span>
  }
  return (
    <Fraction
      numerator={[{ type: 'coef', value: parts[0] }]}
      denominator={[{ type: 'coef', value: parts[1] }]}
    />
  )
})
