import LetterButton from 'components/shared/LetterButton'
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
    <span className={'inline-flex flex-col align-middle mx-1'}>
      {options.map((option, i) => {
        const correct = answered && i === correctAnswer

        return (
          <LetterButton
            className={styles.Option}
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
