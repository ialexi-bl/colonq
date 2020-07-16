import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord_del'
import { createWordsApplet } from 'components/applets/WordsApplet_del'
import { extractLetterAnswer } from '../_common/extract-letter-answer'
import { removeBrackets } from '../_common/remove-brackets'
import WordsAppletManager from 'services/applets/WordsAppletManager'
import presentation from './data.json'

const options: ChoiceOptions = [
  (content) => content.length > 1 && content.split(''),
  [/\[[ау]\]/i, ['а', 'у']],
  [/\[[яю]\]/i, ['я', 'ю']],
  [/\[[еи]\]/i, ['и', 'е']],
]

export default createWordsApplet({
  manager: new WordsAppletManager('/russian/verb-endings', presentation),
  word: getChoiceWord(options, extractLetterAnswer),
  getSettingsLabel: removeBrackets,
})
