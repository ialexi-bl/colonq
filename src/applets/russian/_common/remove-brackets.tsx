import { Word } from 'services/app-data/WordsManager.types'
import React from 'react'
import styles from './CorrectLetter.module.scss'

export const removeBrackets = (_word: Word) => {
  const word = _word.label.replace(/\\/g, '')
  const match = word.match(/^(.*?)\[(.+)\](.*)$/)
  if (!match) return word

  const [, start, letters, end] = match
  const correct =
    letters.length > 1
      ? letters.split('').find((x) => x.toLowerCase() !== x) || letters[0]
      : letters
  return (
    <span>
      {start}
      <strong className={styles.CorrectLetter}>{correct.toLowerCase()}</strong>
      {end}
    </span>
  )
}
