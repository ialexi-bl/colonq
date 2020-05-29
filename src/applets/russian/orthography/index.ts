import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import { extractLetterAnswer } from '../_common/extract-letter-answer'
import { removeBrackets } from '../_common/remove-brackets'
import presentation from './data.json'

const options: ChoiceOptions = [
  (content) => content.length > 1 && content.split(''),
  [/\[[ъь]\]/i, ['ъ', 'ь']],
  [/\[[еи]\]/i, ['е', 'и']],
  [/\[[оа]\]/i, ['а', 'о']],
  [/\[[зс]\]/i, ['з', 'с']],
  [/\[[дт]\]/i, ['д', 'т']],
  [/\[[я]\]/i, ['я', 'е']],
]

export default createWordsApplet({
  manager: new WordsManager('/russian/orthography', presentation),
  word: getChoiceWord(options, extractLetterAnswer),
  getSettingsLabel: removeBrackets,
})
