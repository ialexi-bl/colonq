import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import { extractBrackets } from '../_common/extract-brackets'
import { extractLetterAnswer } from '../_common/extract-letter-answer'
import presentation from './data.json'

const options: ChoiceOptions = [
  (content) => content.length > 1 && content.split(''),
  [/\[[ау]\]/i, ['а', 'у']],
  [/\[[яю]\]/i, ['я', 'ю']],
  [/\[[еи]\]/i, ['и', 'е']],
]

export default createWordsApplet({
  manager: new WordsManager('/russian/verb-endings', presentation),
  word: getChoiceWord(options, extractBrackets, extractLetterAnswer),
})
