import { AppDataManager } from './AppDataManager'
import {
  Word,
  WordsAppDataAction,
  WordsChanges,
  WordsData,
  WordsServerData,
  WordsServerSet,
  WordsSet,
  WordsSetChanges,
} from './WordsAppData.types'
import update from 'immutability-helper'

export class WordsManager extends AppDataManager<
  WordsData,
  WordsAppDataAction
> {
  constructor(applet: string, public readonly wordRegex: RegExp = /^/) {
    super(applet)
    this.isWordSet = this.isWordSet.bind(this)
    this.isWord = this.isWord.bind(this)
  }

  public cleanup(data: WordsData): WordsData {
    // NOTE: here data is mutated, might cause bugs somehow
    delete data.modified
    data.sets.forEach((set) => {
      delete set.modified
      set.words.forEach((word) => {
        delete word.modified
      })
    })
    return { ...data }
  }

  public getUploadData(
    data: WordsData, // Will be used for deleting items
    newData: WordsData,
  ): Record<string, any> | null {
    const changes: WordsChanges = {
      sets: [],
    }

    newData.sets.forEach((set) => {
      if (!set.modified && data) return

      const setChanges: WordsSetChanges = { words: [] }

      set.words.forEach((word) => {
        if (!word.modified && data) return
        setChanges.words.push([word.id, `${+word.enabled}|${word.label}`])
      })

      changes.sets.push([set.id, setChanges])
    })

    return changes.sets.length > 0 ? changes : null
  }

  public reduce(data: WordsData, action: WordsAppDataAction): WordsData {
    switch (action.type) {
      case 'toggle-set': {
        const { index: setIndex } = action.payload
        const state = !data.sets[setIndex].enabled
        return update(data, {
          modified: { $set: true },
          sets: {
            [setIndex]: {
              modified: { $set: true },
              enabled: { $set: state },
              words: (words) =>
                words.map((word) => ({
                  ...word,
                  enabled: state,
                  modified: true,
                })),
            },
          },
        })
      }
      case 'toggle-item': {
        const { setIndex, index } = action.payload
        const { words } = data.sets[setIndex]
        const enabled = !words[index].enabled

        return update(data, {
          modified: { $set: true },
          sets: {
            [setIndex]: {
              modified: { $set: true },
              enabled: {
                $set:
                  enabled ||
                  words.some((word, i) => i !== index && word.enabled),
              },
              words: {
                [index]: {
                  enabled: {
                    $set: enabled,
                  },
                  modified: {
                    $set: true,
                  },
                },
              },
            },
          },
        })
      }
      default:
        return data
    }
  }

  public validate(data: any): data is WordsData {
    return (
      data &&
      typeof data === 'object' &&
      typeof data.lastId === 'number' &&
      Array.isArray(data.sets) &&
      data.sets.every(this.isWordSet)
    )
  }

  public isWordSet(set: any): set is WordsSet {
    return (
      set &&
      typeof set === 'object' &&
      !isNaN(+set.id) &&
      typeof set.label === 'string' &&
      typeof set.enabled === 'boolean' &&
      Array.isArray(set.words) &&
      set.words.every(this.isWord)
    )
  }

  public isWord(word: any): word is Word {
    return (
      word &&
      typeof word === 'object' &&
      typeof word.label === 'string' &&
      typeof word.enabled === 'boolean' &&
      !isNaN(+word.id) &&
      !isNaN(+word.setId)
    )
  }

  public formatForServer(data: WordsData): WordsServerData {
    const serverData: WordsServerData = {
      lastId: data.lastId,
      sets: {},
    }
    data.sets.forEach((set) => {
      const serverSet: WordsServerSet = (serverData.sets[set.id] = {
        label: set.label,
        lastId: set.lastId,
        words: {},
      })
      set.words.forEach((word) => {
        serverSet.words[word.id] = `${+word.enabled}|${word.label}`
      })
    })
    return serverData
  }

  public formatForClient(data: WordsServerData): WordsData {
    return {
      lastId: data.lastId,
      sets: Object.keys(data.sets).map((key: any) =>
        this.formatSet(key, data.sets[key]),
      ),
    }
  }

  private formatWord(key: string | number, setId: number, data: string): Word {
    let label, enabled
    if ((data[0] === '0' || data[0] === '1') && data[1] === '|') {
      enabled = !!+data[0]
      label = data.slice(2)
    } else {
      enabled = false
      label = data
    }
    return {
      id: +key,
      setId,
      label,
      enabled,
    }
  }

  private formatSet(
    key: string | number,
    set: WordsServerSet,
    words?: Word[],
  ): WordsSet {
    const data: WordsSet = {
      id: +key,
      label: set.label,
      lastId: set.lastId,
      enabled: false,
      words: words || [],
    }
    if (!words) {
      Object.keys(set.words).forEach((word) => {
        const newWord = this.formatWord(word, +key, set.words[word])
        if (newWord.enabled) {
          data.enabled = true
        }
        data.words.push(newWord)
      })
    } else {
      data.enabled = words.some((w) => w.enabled)
    }
    return data
  }
}
