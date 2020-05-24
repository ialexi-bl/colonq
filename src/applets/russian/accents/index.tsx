import { AccentWord } from './AccentWord'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'

export default createWordsApplet({
  manager: new WordsManager('/russian/accents'),
  word: AccentWord,
})
