import AnswerButton from '../AnswerButton'
import React from 'react'
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
    <span className={styles.Container}>
      {options.map((option, i) => {
        const correct = answered && i === correctAnswer
        return (
          <AnswerButton
            style={getOptionsStyles(i, answer, options.length, correctAnswer)}
            onClick={onChange && active ? () => onChange(i) : undefined}
            tabIndex={active ? 0 : -1}
            className={styles.Option}
            incorrect={!correct && i === answer}
            correct={correct}
            key={i}
          >
            {option}
          </AnswerButton>
        )
      })}
    </span>
  )
}
