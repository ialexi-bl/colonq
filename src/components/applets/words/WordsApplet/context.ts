import { createContext } from 'react'
import WordsAppletManager from 'services/applets/WordsAppletManager'

export type WordsAppletText = {
  title: string
  help: string
}
export type IWordsAppletContext = {
  manager: WordsAppletManager
  text: WordsAppletText
}

const WordsAppletContext = createContext<IWordsAppletContext>({} as any)
export default WordsAppletContext
