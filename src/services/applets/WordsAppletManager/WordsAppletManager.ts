import {
  WordsChanges,
  WordsData,
  WordsEditAction,
  WordsPresentation,
  WordsUserData,
} from './types'
import AppletManager from '../AppletManager'
import update from 'immutability-helper'

export default class WordsAppletManager extends AppletManager<
  WordsData,
  WordsUserData,
  WordsEditAction
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
            groupIndex: i,
            // enabled and unchanged may be undefined so checking if not 0
            unchanged: enabled[j] !== 0,
            enabled: enabled[j] !== 0,
          }
        }),
      }
    })
  }

  public reduce(sets: WordsData, action: WordsEditAction): WordsData {
    switch (action.type) {
      case 'toggle-group': {
        const { groupIndex } = action.payload
        const state = !sets[groupIndex].enabled

        return update(sets, {
          [groupIndex]: {
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
        const { groupIndex, itemIndex } = action.payload
        const { words } = sets[groupIndex]
        const enabled = !words[itemIndex].enabled

        return update(sets, {
          [groupIndex]: {
            modified: { $set: true },
            enabled: {
              $set:
                enabled ||
                words.some((word, i) => {
                  return i !== itemIndex && word.enabled
                }),
            },
            words: {
              [itemIndex]: {
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
