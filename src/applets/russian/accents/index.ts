import { AccentWord } from './AccentWord'
import { WordsAppletManager } from 'services/applets/WordsAppletManager/WordsAppletManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import presentation from './data.json'

export default createWordsApplet({
  manager: new WordsAppletManager('/russian/accents', presentation),
  word: AccentWord,
  getSettingsLabel: (word) => word.label,
})
