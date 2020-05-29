import { Word } from 'services/app-data/WordsManager.types'
import React from 'react'
import styles from '../_common/CorrectLetter.module.scss'

export const getParonymLabel = (_word: Word) => {
  const word = _word.label.replace(/\\/g, '')
  const match = word.match(/^(.*?)\[[а-яё|]*([А-ЯЁ]+)[а-яё|]*\](.*)$/)
  if (!match) return word

  const [, start, option, end] = match
  return (
    <span>
      {start}
      <strong className={styles.CorrectLetter}>{option.toLowerCase()}</strong>
      {end}
    </span>
  )
}
