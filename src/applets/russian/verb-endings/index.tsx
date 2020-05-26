import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'

const options: ChoiceOptions = [
  [['а', 'у'], /\[[ау]\]/i],
  [['я', 'ю'], /\[[яю]\]/i],
  [['и', 'е'], /\[[еи]\]/i],
]

export default createWordsApplet({
  manager: new WordsManager('/russian/verb-endings'),
  word: getChoiceWord(options, /^(.*?)\[(.{1,3})\](.*)$/),
})
