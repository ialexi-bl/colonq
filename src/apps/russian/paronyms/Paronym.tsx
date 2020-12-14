import { TwoLatestDisplayViewProps } from 'components/shared/TwoLatestDisplay'
import { WordsNext } from 'apps/shared/words/WordsSession'
import { useState } from 'react'
import Input from 'components/form/Input'

export type ParonymsProblem = {
  id: string
  answer: string
  problem: string
  placeholder: string
}

export type ParonymProps = TwoLatestDisplayViewProps<ParonymsProblem> & {
  next: WordsNext
}
export const Paronym = function Paronym({
  item,
  next,
  active,
  firstItem,
}: ParonymProps) {
  const [value, setValue] = useState('')
  const [start, end] = item.problem.split('_')
  const isCorrect =
    value.trim().toLowerCase() === (item.answer as any).toLowerCase()

  return (
    <div className={'text-center text-xl leading-relaxed px-1'}>
      {start}
      <Input
        size={(item.answer as any).length + 4}
        value={active ? value : item.answer}
        state={active ? undefined : isCorrect ? 'valid' : 'invalid'}
        className={'text-center text-base uppercase mx-1'}
        tabIndex={active ? 0 : -1}
        onChange={(e) => active && setValue(e.target.value)}
        autoFocus={!firstItem}
        placeholder={item.placeholder}
        onKeyDown={(e) => {
          if (e.key !== 'Enter' || !active) return

          if (value) next(value)
          else {
            setValue(item.placeholder)
            next(item.placeholder)
          }
        }}
      />
      {end}
    </div>
  )
}
