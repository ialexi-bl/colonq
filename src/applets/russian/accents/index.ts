import { AccentWord } from './AccentWord'
import { createWordsApplet } from 'components/applets/WordsApplet_del'
import WordsAppletManager from 'services/applets/WordsAppletManager'
import presentation from './data.json'

export default createWordsApplet({
  manager: new WordsAppletManager('/russian/accents', presentation),
  word: AccentWord,
  getSettingsLabel: (word) => word.label,
})
