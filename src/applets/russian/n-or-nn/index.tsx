import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from '../../../components/applets/WordsApplet/WordsApplet'

const options: ChoiceOptions = [[['н', 'нн'], /^/]]
export default createWordsApplet({
  manager: new WordsManager('/russian/n-or-nn'),
  word: getChoiceWord(options, /^(.*?)\[(.{1,2})\](.*)$/),
})
