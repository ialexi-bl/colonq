import { Paronym } from './Paronym'
import { ParonymsHelp } from './Help'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import { getParonymLabel } from './settings-label'
import presentation from './data.json'

export default createWordsApplet({
  manager: new WordsManager('/russian/verb-endings', presentation as any),
  word: Paronym,
  help: ParonymsHelp,
  getSettingsLabel: getParonymLabel,
})
