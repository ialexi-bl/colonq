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

export type WordsData = WordsGroup[]
export type WordsGroup = {
  modified?: boolean
  enabled: boolean
  words: Word[]
  label: string
  id: number
}
export type Word = {
  groupIndex: number
  unchanged: boolean
  enabled: boolean
  label: string
  id: number
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
        groupIndex: number
        index: number
      }
    }
