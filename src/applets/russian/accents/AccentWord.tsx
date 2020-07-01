import { TwoLatestDisplayViewProps } from 'components/applets/TwoLatestDisplay'
import { Word } from 'services/applets/WordsAppletManager/types'
import ChoiceButton from 'components/applets/AnswerButton'
import React, { memo, useState } from 'react'
import cn from 'clsx'
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

export const AccentWord = memo(function AccentWord({
  item: word,
  active,
  next,
}: TwoLatestDisplayViewProps<Word>) {
  const [answer, setAnswer] = useState(-1)
  const answered = answer >= 0

  let hidden = false
  return (
    <div className={cn(styles.Word, {})}>
      {word.label.split('').map((letter, i) => {
        if (letter === '(') {
          hidden = true
        } else if (letter === ')') {
          hidden = false
        }

        const lower = letter.toLowerCase()
        if (!(lower in vowels) || hidden) {
          return (
            <div key={`${i}-${letter}`} className={styles.Letter}>
              {letter}
            </div>
          )
        }

        const isCorrect =
          word.label[i] !== word.label[i].toLowerCase() || letter === 'ё'

        return (
          <ChoiceButton
            key={`${i}-${letter}`}
            onClick={() => {
              setAnswer(i)
              next()
            }}
            tabIndex={active ? 0 : -1}
            className={styles.Letter}
            incorrect={answered && isCorrect}
            correct={answered && !isCorrect && i === answer}
          >
            {lower === 'ё' && !answered ? 'е' : lower}
          </ChoiceButton>
        )
      })}
    </div>
  )
})
