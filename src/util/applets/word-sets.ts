import { ListEditorRoot } from 'components/list-editor/list-editor-types'
import {
  createListEditorRoot,
  createListEditorSection,
} from './createListEditorRoot'

export type WordInSet = [number, string] | [number, string, 1]
export type WordsSet = {
  id: number
  label: string
  enabled?: 1
  preset?: 1
  lastId: number
  words: WordInSet[]
}
export type WordsList = {
  lastId: number
  sets: WordsSet[]
}
export type WordsListChanges = {
  lastId: number
  changed: WordsSet[]
  deleted: number[]
}

export const wordsets2list = (list: WordsList): ListEditorRoot => {
  return createListEditorRoot({
    type: 'list',
    lastId: list.lastId,
    items: (parent) =>
      list.sets.map((set) =>
        createListEditorSection({
          parent,
          id: set.id,
          type: 'section',
          label: set.label,
          folded: true,
          enabled: !!set.enabled,
          lastId: set.lastId,
          data: {
            preset: !!set.preset,
          },
          items: (parent) =>
            set.words.map((word) => ({
              parent,
              type: 'leaf',
              id: word[0],
              label: word[1],
              enabled: !!word[2],
            })),
        }),
      ),
  })
}
export const list2wordsets = (
  formatWord: (item: WordInSet) => WordInSet = (x) => x,
) => ({ lastId, items }: ListEditorRoot): WordsList => {
  return {
    lastId: lastId,
    sets: items.map((section) => {
      const set: WordsSet = {
        id: section.id,
        label: section.label,
        lastId: section.lastId,
        words: section.items.map(({ id, label, enabled }) =>
          formatWord(enabled ? [id, label, 1] : [id, label]),
        ),
      }
      if (section.enabled) set.enabled = 1
      if (section.data.preset) set.preset = 1
      return set
    }),
  }
}
