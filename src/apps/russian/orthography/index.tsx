import React from 'react'
import Suffixes from 'components/icons/subjects/russian/Suffixes'
import WordsApplet from 'components/applets/words/WordsApplet'
import WordsAppletManager from 'services/applets/WordsAppletManager'
import presentation from './data.json'
import useIsAuthenticated from 'hooks/shared/use-is-authenticated'

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

export default () => {
  if (!useIsAuthenticated()) return null

  return (
    <WordsApplet
      manager={manager}
      title={'Орфография'}
      icon={<Suffixes />}
      description={
        'Выбирай из нескольких вариантов букву, которая должна стоять на месте пропуска в слове и проверяй ответ'
      }
    />
  )
}
