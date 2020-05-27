export type WordsPresentation = {
  label: string
  words: string[]
}[]
export type WordsUserData = {
  [key: number]: (0 | 1)[]
}
export type WordsChanges = {
  [key: number]: [number, 0 | 1][]
}

export type WordSets = WordsSet[]
export type WordsSet = {
  id: number
  label: string
  words: Word[]
  enabled: boolean
  modified?: boolean
}
export type Word = {
  id: number
  label: string
  enabled: boolean
  original: boolean
  setIndex: number
}

export type WordsAppDataDispatch = (action: WordsAppDataAction) => unknown
export type WordsAppDataAction =
  | {
      type: 'toggle-set'
      payload: {
        index: number
      }
    }
  | {
      type: 'toggle-item'
      payload: {
        index: number
        setIndex: number
      }
    }
