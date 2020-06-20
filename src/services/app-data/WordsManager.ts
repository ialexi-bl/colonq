import { AppDataManager } from './AppDataManager'
import {
  WordsData,
  WordsAppDataAction,
  WordsChanges,
  WordsPresentation,
  WordsUserData,
} from './WordsManager.types'
import update from 'immutability-helper'

export class WordsManager extends AppDataManager<
  WordsData,
  WordsUserData,
  WordsAppDataAction
> {
  defaultData: WordsUserData = {}

  constructor(
    applet: string,
    public readonly presentation: WordsPresentation,
    public readonly wordRegex: RegExp = /^/,
  ) {
    super(applet)
  }

  public cleanup(data: WordsData): WordsData {
    // NOTE: here data is mutated, might cause side effects
    data.forEach((set) => {
      delete set.modified
      set.words.forEach((word) => {
        word.unchanged = word.enabled
      })
    })
    return { ...data }
  }

  public getUploadData(
    sets: WordsData,
    force?: boolean,
  ): Record<string, any> | null {
    const changes: WordsChanges = {}
    let count = 0

    sets.forEach((set) => {
      if (!set.modified && !force) return

      changes[set.id] = []
      set.words.forEach((word) => {
        if (word.enabled === word.unchanged && !force) return

        ++count
        changes[set.id].push([word.id, +word.enabled as 0 | 1])
      })
    })

    return count > 0 ? changes : null
  }

  public validate(data: any): data is WordsUserData {
    return (
      data &&
      typeof data === 'object' &&
      Object.keys(data).every(
        (key) =>
          Array.isArray(data[key]) &&
          data[key].every((e: any) => [0, 1].includes(e)),
      )
    )
  }

  public formatToStore(sets: WordsData): WordsUserData {
    const serverData: WordsUserData = {}

    sets.forEach((set) => {
      serverData[set.id] = set.words.map((word) => +word.enabled as 0 | 1)
    })
    return serverData
  }

  public formatForClient(data: WordsUserData): WordsData {
    return this.presentation.map((set, i) => {
      const enabled = data[i] || []

      return {
        id: i,
        label: set.label,
        enabled:
          enabled.length < set.words.length ? true : enabled.some((x) => x),
        words: set.words.map((word, j) => {
          return {
            id: j,
            label: word,
            setIndex: i,
            enabled: !!(enabled[j] ?? true),
            original: !!(enabled[j] ?? true),
          }
        }),
      }
    })
  }

  public reduce(sets: WordsData, action: WordsAppDataAction): WordsData {
    switch (action.type) {
      case 'toggle-set': {
        const { index: setIndex } = action.payload
        const state = !sets[setIndex].enabled

        return update(sets, {
          [setIndex]: {
            modified: { $set: true },
            enabled: { $set: state },
            words: (words) => {
              return words.map((word) => ({
                ...word,
                enabled: state,
                modified: true,
              }))
            },
          },
        })
      }
      case 'toggle-item': {
        const { groupIndex: setIndex, index } = action.payload
        const { words } = sets[setIndex]
        const enabled = !words[index].enabled

        return update(sets, {
          [setIndex]: {
            modified: { $set: true },
            enabled: {
              $set:
                enabled ||
                words.some((word, i) => {
                  return i !== index && word.enabled
                }),
            },
            words: {
              [index]: {
                enabled: {
                  $set: enabled,
                },
              },
            },
          },
        })
      }
      default:
        return sets
    }
  }
}
