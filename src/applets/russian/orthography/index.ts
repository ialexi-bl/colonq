import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import { extractBrackets } from '../_common/extract-brackets'
import { extractLetterAnswer } from '../_common/extract-letter-answer'
import presentation from './data.json'

const options: ChoiceOptions = [
  [['ъ', 'ь'], /\[[ъь]\]/i],
  [['е', 'и'], /\[[еи]\]/i],
  [['а', 'о'], /\[[оа]\]/i],
  [['з', 'с'], /\[[зс]\]/i],
  [['д', 'т'], /\[[дт]\]/i],
  [['я', 'е'], /\[[я]\]/i],
]

export default createWordsApplet({
  manager: new WordsManager('/russian/orthography', presentation),
  word: getChoiceWord(options, extractBrackets, extractLetterAnswer),
})
