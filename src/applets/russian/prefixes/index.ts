import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import { extractLetterAnswer } from '../_common/extract-letter-answer'
import { removeBrackets } from '../_common/remove-brackets'
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
  manager: new WordsManager('/russian/prefixes', presentation),
  word: getChoiceWord(options, extractLetterAnswer),
  getSettingsLabel: removeBrackets,
})
