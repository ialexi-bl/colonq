import {
  ListEditorLeaf,
  ListEditorRoot,
  ListEditorSection,
} from 'components/list-editor/list-editor-types'

export type CreateListEditorRootOptions = Omit<ListEditorRoot, 'items'> & {
  items: (parent: ListEditorRoot) => ListEditorSection[]
}
export type CreateListEditorSectionOptions = Omit<
  ListEditorSection,
  'items'
> & {
  items: (parent: ListEditorSection) => ListEditorLeaf[]
}
export function createListEditorRoot(options: CreateListEditorRootOptions) {
  const list: ListEditorRoot = {
    // This works very strangely with types, so leaving as any
    ...(options as any),
    items: [],
  }
  list.items = options.items(list)
  return list
}
export function createListEditorSection(
  options: CreateListEditorSectionOptions,
) {
  const section: ListEditorSection = {
    ...(options as any),
    items: [],
  }
  section.items = options.items(section)
  return section
}
