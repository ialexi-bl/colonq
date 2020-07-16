import React from 'react'
import WordsApplet from 'components/applets/words/WordsApplet'
import WordsAppletManager from 'services/applets/WordsAppletManager'
import presentation from './data.json'

// const options: ChoiceOptions = [
//   (content) => content.length > 1 && content.split(''),
//   [/\[[ъь]\]/i, ['ъ', 'ь']],
//   [/\[[еи]\]/i, ['е', 'и']],
//   [/\[[оа]\]/i, ['а', 'о']],
//   [/\[[зс]\]/i, ['з', 'с']],
//   [/\[[дт]\]/i, ['д', 'т']],
//   [/\[[я]\]/i, ['я', 'е']],
// ]

// export const a = createWordsApplet({
//   manager: new WordsAppletManager('/russian/orthography', presentation),
//   word: getChoiceWord(options, extractLetterAnswer),
//   getSettingsLabel: removeBrackets,
// })

const manager = new WordsAppletManager('/russian/orthography', presentation)
const text = {
  title: 'Орфография',
  help: 'help',
}

export default () => <WordsApplet manager={manager} text={text} />
