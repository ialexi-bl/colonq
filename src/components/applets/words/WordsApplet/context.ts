import { ReactNode, createContext } from 'react'
import WordsAppletManager from 'services/applets/WordsAppletManager'

export type WordsAppletText = {
  title: string
  help: string
}
export type IWordsAppletContext = {
  manager: WordsAppletManager
  description?: ReactNode
  title: string
  icon: ReactNode
}

const WordsAppletContext = createContext<IWordsAppletContext>({} as any)
export default WordsAppletContext
