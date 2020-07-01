import { Paronym } from './Paronym'
import { ParonymsHelp } from './Help'
import { WordsAppletManager } from 'services/applets/WordsAppletManager/WordsAppletManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import { getParonymLabel } from './settings-label'
import presentation from './data.json'

export default createWordsApplet({
  manager: new WordsAppletManager('/russian/verb-endings', presentation as any),
  word: Paronym,
  help: ParonymsHelp,
  getSettingsLabel: getParonymLabel,
})
