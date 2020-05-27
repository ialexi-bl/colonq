import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import { extractBrackets } from '../_common/extract-brackets'
import { extractLetterAnswer } from '../_common/extract-letter-answer'
import presentation from './data.json'

const options: ChoiceOptions = [
  [['е', 'и'], /пр\[[еи]\]/i],
  [['ъ', 'ь'], /\[[ъь]\]/i],
  [['з', 'с'], /\[[зс]\]/i],
  [['д', 'т'], /\[[дт]\]/i],
  [['и', 'ы'], /\[[ыи]\]/i],
  [['а', 'о'], /\[[оа]\]/i],
  // и is not present in current set apart from пре/при
  [['е', 'и'], /\[[е]\]/i],
]

export default createWordsApplet({
  manager: new WordsManager('/russian/prefixes', presentation),
  word: getChoiceWord(options, extractBrackets, extractLetterAnswer),
})
