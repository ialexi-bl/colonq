import { Paronym } from './Paronym'
import { ParonymsHelp } from './Help'
import { createWordsApplet } from 'components/applets/WordsApplet_del'
import { getParonymLabel } from './settings-label'
import WordsAppletManager from 'services/applets/WordsAppletManager'
import presentation from './data.json'

export default createWordsApplet({
  manager: new WordsAppletManager('/russian/verb-endings', presentation as any),
  word: Paronym,
  help: ParonymsHelp,
  getSettingsLabel: getParonymLabel,
})
