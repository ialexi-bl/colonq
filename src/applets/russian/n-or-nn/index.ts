import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import { extractBrackets } from '../_common/extract-brackets'
import { extractLetterAnswer } from '../_common/extract-letter-answer'

const options: ChoiceOptions = () => ['н', 'нн']
export default createWordsApplet({
  manager: new WordsManager('/russian/n-or-nn', []),
  word: getChoiceWord(options, extractBrackets, extractLetterAnswer),
})
