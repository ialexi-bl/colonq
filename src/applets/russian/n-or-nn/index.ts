import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord_del'
import { createWordsApplet } from 'components/applets/WordsApplet_del'
import { extractLetterAnswer } from '../_common/extract-letter-answer'
import WordsAppletManager from 'services/applets/WordsAppletManager'

const options: ChoiceOptions = () => ['н', 'нн']
export default createWordsApplet({
  manager: new WordsAppletManager('/russian/n-or-nn', []),
  word: getChoiceWord(options, extractLetterAnswer),
  getSettingsLabel: (word) => word.label,
})
