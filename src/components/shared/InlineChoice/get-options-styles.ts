import styles from './InlineChoice.module.scss'

const optionMargin = parseFloat(styles.optionMargin)
const optionHeight = parseFloat(styles.optionHeight)

/**
 * Computes styles for option animation
 * @param optionsCount
 * @param answer - Clicked option index
 * @param correctAnswer - Index of the correct option
 * @param i - Currently processed option index
 */
const getOptionsStyles = (
  i: number,
  answer: number | undefined | null,
  optionsCount: number,
  correctAnswer: number,
) => {
  if (typeof answer !== 'number') return undefined
  if (i !== correctAnswer && i !== answer) return { opacity: 0 }

  const offset = optionMargin / 2
  const yCurrent = optionHeight * i + optionMargin * i
  let yNeeded = (optionHeight / 2 + offset) * (optionsCount - 1)

  if (answer !== correctAnswer) {
    yNeeded =
      /* 
        Equivalent to
        answer < correctAnswer && i === answer ||  // Correct on top, current is correct
        answer > correctAnswer && i !== answer     // Correct on bottom, current is wrong
      */
      answer < correctAnswer === (i === answer)
        ? yNeeded - optionHeight / 2 - offset
        : yNeeded + optionHeight / 2 + offset
  }

  return {
    transform: `translateY(${yNeeded - yCurrent}em)`,
  }
}
export default getOptionsStyles
