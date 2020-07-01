import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord_del'
import { WordsAppletManager } from 'services/applets/WordsAppletManager/WordsAppletManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import { extractLetterAnswer } from '../_common/extract-letter-answer'

const options: ChoiceOptions = () => ['н', 'нн']
export default createWordsApplet({
  manager: new WordsAppletManager('/russian/n-or-nn', []),
  word: getChoiceWord(options, extractLetterAnswer),
  getSettingsLabel: (word) => word.label,
})
