import { ChoiceButton } from '../ChoiceButton'
import React from 'react'
import styles from './InlineChoice.module.scss'

export type InlineChoiceProps = {
  answer?: number | undefined | null
  options: string[]
  onChange: (i: number) => unknown
  forceErrorColor?: boolean
  correctAnswer: number
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
    <div className={styles.Container}>
      {options.map((option, i) => (
        <ChoiceButton
          key={i}
          tabIndex={active ? 0 : -1}
          style={getStyles(i, answer, correctAnswer, options.length)}
          onClick={answered ? undefined : () => onChange(i)}
          correct={
            answered && (i === answer || i === correctAnswer)
              ? i === correctAnswer
              : null
          }
          className={styles.Option}
        >
          {option}
        </ChoiceButton>
      ))}
    </div>
  )
}

const optionMargin = parseFloat(styles.optionMargin)
const optionHeight = parseFloat(styles.optionHeight)

/**
 * Computes styles for option animation
 * @param optionsCount
 * @param answer - Clicked option index
 * @param correctAnswer - Index of the correct option
 * @param i - Currently processed option index
 */
const getStyles = (
  i: number,
  answer: number | undefined | null,
  correctAnswer: number,
  optionsCount: number,
) => {
  if (typeof answer !== 'number') return undefined
  if (i !== correctAnswer && i !== answer) return { opacity: 0 }

  const offset = optionMargin / 2
  const yCurrent = optionHeight * i + optionMargin * i
  let yNeeded = (optionHeight / 2 + offset) * (optionsCount - 1)

  if (answer !== correctAnswer) {
    yNeeded =
      // Equivalent to
      // answer < correctAnswer && i === answer || -> Correct on top, current is correct
      // answer > correctAnswer && i !== answer -> Correct on bottom, current is wrong
      answer < correctAnswer === (i === answer)
        ? yNeeded - optionHeight / 2 - offset
        : yNeeded + optionHeight / 2 + offset
  }

  return {
    transform: `translateY(${yNeeded - yCurrent}em)`,
  }
}
