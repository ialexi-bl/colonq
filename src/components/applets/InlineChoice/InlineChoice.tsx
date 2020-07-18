import LetterButton from 'components/shared/LetterButton'
import React from 'react'
import cn from 'clsx'
import getOptionsStyles from './get-options-styles'
import styles from './InlineChoice.module.scss'

export type InlineChoiceProps = {
  correctAnswer: number
  onChange?: (i: number) => unknown
  options: string[]
  answer?: number | undefined | null
  active?: boolean
}

export default function InlineChoice({
  correctAnswer,
  onChange,
  options,
  answer,
  active = true,
}: InlineChoiceProps) {
  const answered = typeof answer === 'number'

  return (
    <span className={cn('align-middle inline-block mx-1', styles.Container)}>
      {options.map((option, i) => {
        const correct = answered && i === correctAnswer

        return (
          <LetterButton
            className={cn('block min-w-12', i !== options.length - 1 && 'mb-1')}
            tabIndex={active ? 0 : -1}
            onClick={onChange && active ? () => onChange(i) : undefined}
            state={correct ? 'correct' : i === answer ? 'incorrect' : undefined}
            style={getOptionsStyles(i, answer, options.length, correctAnswer)}
            key={i}
          >
            {option}
          </LetterButton>
        )
      })}
    </span>
  )
}
