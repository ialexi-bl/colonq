import { ChoiceButton } from 'components/applets/ChoiceButton'
import { TwoLatestDisplayViewProps } from 'components/applets/TwoLatestDisplay'
import { Word } from 'services/app-data/WordsAppData.types'
import { reduceFont } from '../../../components/applets/WordsApplet/reduce-font'
import React, { memo, useState } from 'react'
import cn from 'clsx'
import styles from './Accents.module.scss'

export type AccentWordProps = {
  word: [number, string]
  onLetterClick: (i: number) => unknown
  answer: undefined | number
}

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

  return (
    <div style={reduceFont(word.label, 2.2)} className={cn(styles.Word, {})}>
      {word.label.split('').map((letter, i) => {
        if (letter === '\\') return null

        const lower = letter.toLowerCase()
        if (!(lower in vowels) || word.label[i - 1] === '\\') {
          return (
            <div key={`${i}-${letter}`} className={styles.Letter}>
              {letter}
            </div>
          )
        }

        const isCorrect =
          word.label[i] !== word.label[i].toLowerCase() || letter === 'ё'
        const involved = answered && (i === answer || isCorrect)
        const correct = involved ? isCorrect : null

        return (
          <ChoiceButton
            key={`${i}-${letter}`}
            onClick={() => {
              setAnswer(i)
              next()
            }}
            tabIndex={active ? 0 : -1}
            className={styles.Letter}
            correct={correct}
          >
            {lower === 'ё' && !answered ? 'е' : lower}
          </ChoiceButton>
        )
      })}
    </div>
  )
})
