import { ChoiceOptions, getChoiceWord } from 'components/applets/ChoiceWord'
import { WordsManager } from 'services/app-data/WordsManager'
import { createWordsApplet } from 'components/applets/WordsApplet'
import { extractBrackets } from '../_common/extract-brackets'
import findIndex from 'lodash/findIndex'
import presentation from './data.json'

const getOptions: ChoiceOptions = (content) => content.split('|')
export default createWordsApplet({
  manager: new WordsManager('/russian/verb-endings', presentation as any),
  word: getChoiceWord(getOptions, extractBrackets, (_, options) =>
    findIndex(options, (option) => option.toLowerCase() !== option),
  ),
})
