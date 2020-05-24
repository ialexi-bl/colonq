import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'

const options: ChoiceOptions = [
  [['ъ', 'ь'], /\[[ъь]\]/i],
  [['е', 'и'], /\[[еи]\]/i],
  [['а', 'о'], /\[[оа]\]/i],
  [['з', 'с'], /\[[зс]\]/i],
  [['д', 'т'], /\[[дт]\]/i],
  [['я', 'е', 'иdex'], /\[[я]\]/i],
]

export default createWordsApplet({
  manager: new WordsManager('/russian/orthography'),
  word: getChoiceWord(options, /^(.*?)\[(.{1,2})\](.*)$/),
})
