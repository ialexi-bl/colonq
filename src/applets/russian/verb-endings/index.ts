import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import { extractBrackets } from '../_common/extract-brackets'
import { extractLetterAnswer } from '../_common/extract-letter-answer'
import presentation from './data.json'

const options: ChoiceOptions = [
  [['а', 'у'], /\[[ау]\]/i],
  [['я', 'ю'], /\[[яю]\]/i],
  [['и', 'е'], /\[[еи]\]/i],
]

export default createWordsApplet({
  manager: new WordsManager('/russian/verb-endings', presentation),
  word: getChoiceWord(options, extractBrackets, extractLetterAnswer),
})
