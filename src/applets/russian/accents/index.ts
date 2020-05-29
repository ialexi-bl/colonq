import { AccentWord } from './AccentWord'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import presentation from './data.json'

export default createWordsApplet({
  manager: new WordsManager('/russian/accents', presentation),
  word: AccentWord,
  getSettingsLabel: (word) => word.label,
})
