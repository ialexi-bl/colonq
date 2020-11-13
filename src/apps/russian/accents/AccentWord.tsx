import { AccentsProblem } from './AccentsSession'
import { TwoLatestDisplayViewProps } from 'components/apps/TwoLatestDisplay'
import LetterButton from 'components/shared/LetterButton'
import React, { useState } from 'react'
import styles from './Accents.module.scss'

export const vowels = {
  а: true,
  я: true,
  о: true,
  ё: true,
  ы: true,
  и: true,
  э: true,
  е: true,
  у: true,
  ю: true,
}

export const AccentWord = function AccentWord({
  item,
  active,
  next,
}: TwoLatestDisplayViewProps<AccentsProblem, (answer: number) => unknown>) {
  const [answer, setAnswer] = useState(-1)
  const answered = answer >= 0

  let skip = false
  return (
    <div className={styles.Word}>
      {item.problem.split('').map((letter, i) => {
        if (letter === '(') {
          skip = true
        } else if (letter === ')') {
          skip = false
        }

        const lower = letter.toLowerCase()
        if (!(lower in vowels) || skip) {
          return (
            <div key={`${i}-${letter}`} className={styles.Letter}>
              {letter}
            </div>
          )
        }

        const isAnswer = item.answer === i
        return (
          <LetterButton
            key={`${i}-${letter}`}
            onClick={() => {
              setAnswer(i)
              next(i)
            }}
            tabIndex={active ? 0 : -1}
            className={styles.Letter}
            state={
              !answered
                ? null
                : isAnswer
                ? 'correct'
                : i === answer
                ? 'incorrect'
                : null
            }
          >
            {/* Hiding points above ё */}
            {answered || lower !== 'ё' ? lower : 'е'}
          </LetterButton>
        )
      })}
    </div>
  )
}
