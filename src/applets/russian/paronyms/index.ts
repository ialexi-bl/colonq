import { Paronym } from './Paronym'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import presentation from './data.json'

export default createWordsApplet({
  manager: new WordsManager('/russian/verb-endings', presentation as any),
  word: Paronym,
})
