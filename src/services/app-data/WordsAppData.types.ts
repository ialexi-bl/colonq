export type WordsServerData = {
  lastId: number
  sets: Record<string, WordsServerSet>
}
export type WordsServerSet = {
  label: string
  lastId: number
  words: Record<string, string>
}
export type WordsData = {
  modified?: boolean
  lastId: number
  sets: WordsSet[]
}
export type WordsSet = {
  id: number
  label: string
  lastId: number
  enabled: boolean
  modified?: boolean
  words: Word[]
  // error?: null | string
}
export type Word = {
  id: number
  setId: number
  label: string
  enabled: boolean
  modified?: boolean
  // error?: null | string
}
export type WordsChanges = {
  // lastId: number
  sets: [number, WordsSetChanges][]
}
export type WordsSetChanges = {
  words: [number, string][]
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
