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

export type WordsEditDispatch = (action: WordsEditAction) => unknown
export type WordsEditAction =
  | {
      type: 'toggle-group'
      payload: {
        groupIndex: number
      }
    }
  | {
      type: 'toggle-item'
      payload: {
        groupIndex: number
        itemIndex: number
      }
    }
