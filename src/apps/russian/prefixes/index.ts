import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord_del'
import { createWordsApplet } from 'components/applets/WordsApplet_del'
import { extractLetterAnswer } from '../_common/extract-letter-answer'
import { removeBrackets } from '../_common/remove-brackets'
import WordsAppletManager from 'services/applets/WordsAppletManager'
import presentation from './data.json'

const options: ChoiceOptions = [
  (content) => content.length > 1 && content.split(''),
  [/пр\[[еи]\]/i, ['е', 'и']],
  [/\[[ъь]\]/i, ['ъ', 'ь']],
  [/\[[зс]\]/i, ['з', 'с']],
  [/\[[дт]\]/i, ['д', 'т']],
  [/\[[ыи]\]/i, ['и', 'ы']],
  [/\[[оа]\]/i, ['а', 'о']],
  // и is not present in current set apart from пре/при
  [/\[[е]\]/i, ['е', 'и']],
]

export default createWordsApplet({
  manager: new WordsAppletManager('/russian/prefixes', presentation),
  word: getChoiceWord(options, extractLetterAnswer),
  getSettingsLabel: removeBrackets,
})
