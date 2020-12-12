import { TwoLatestDisplayViewProps } from 'components/apps/TwoLatestDisplay'
import { WordsNext } from 'apps/shared/words/WordsSession'
import LetterButton from 'components/shared/LetterButton'
import React, { useEffect, useState } from 'react'
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
export type AccentsProblem = {
  problem: string
  answer: number
  id: string
}

export type AccentWordProps = TwoLatestDisplayViewProps<AccentsProblem> & {
  next: WordsNext
}
export const AccentWord = function AccentWord({
  next,
  item,
  active,
}: AccentWordProps) {
  const [answer, setAnswer] = useState(-1)
  const answered = answer >= 0

  // Adding ability to answer pressing number buttons on keyboard
  useEffect(() => {
    if (answered) return

    const vowelsIndexes: number[] = getVowelsIndexes(item.problem)
    function onKeyDown(e: KeyboardEvent) {
      if (e.repeat || isNaN(+e.key)) return
      const number = +e.key || 10

      if (number > 0 && number <= vowelsIndexes.length) {
        setAnswer(vowelsIndexes[number - 1])
        next(vowelsIndexes[number - 1])
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [answered, item.problem, next])

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

function getVowelsIndexes(word: string) {
  const result: number[] = []
  let brackets = false
  word.split('').forEach((letter, i) => {
    if (letter === '(') brackets = true
    else if (letter === ')') brackets = false
    else if (!brackets && letter in vowels) result.push(i)
  })
  return result
}
