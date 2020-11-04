import { ReactNode, createContext } from 'react'

export type WordsAppletText = {
  title: string
  help: string
}
export type IWordsAppletContext = {
  description?: string
  manager: any
  title: string
  icon: ReactNode
}

const WordsAppletContext = createContext<IWordsAppletContext>({} as any)
export default WordsAppletContext
