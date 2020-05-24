export type ValidateListItem = (
  item: ListEditorItem,
  value: string,
  blur: boolean,
) => { error: null | string; value: string }

export type ListEditorRoot = {
  type: 'list'
  lastId: number
  modified?: boolean
  items: ListEditorSection[]
  data?: any
}

type ListEditorItemBase = {
  id: number
  new?: boolean
  label: string
  error?: null | string
  enabled?: boolean
  modified?: boolean
  data?: any
}

export type ListEditorSection = ListEditorItemBase & {
  type: 'section'
  items: ListEditorLeaf[]
  parent: ListEditorRoot
  lastId: number
  folded?: boolean
  deleting?: boolean
}

export type ListEditorLeaf = ListEditorItemBase & {
  type: 'leaf'
  parent: ListEditorSection
  deleting?: boolean
}

export type ListEditorContainer = (
  | Omit<ListEditorSection, 'items'>
  | Omit<ListEditorRoot, 'items'>
) & {
  items: (ListEditorSection | ListEditorLeaf)[]
}
export type ListEditorItem = ListEditorSection | ListEditorLeaf

export type ListEditorAction =
  | {
      type: 'set-list'
      getList: (list: ListEditorRoot) => ListEditorRoot
    }
  | {
      type: 'merge-list'
      list: ListEditorRoot
    }
  | {
      type: 'delete'
      item: ListEditorItem
      index: number
      target: HTMLElement
    }
  | {
      type: 'destroy'
      index: number
    }
  | {
      type: 'cancel-delete'
      index: number
      section: ListEditorSection
      event: React.SyntheticEvent<HTMLElement>
    }
  | {
      type: 'add'
      container: ListEditorContainer
      target: HTMLElement | null
      prev?: boolean | null
    }
  | {
      type: 'toggle-fold'
      state: boolean
      index: number
    }
  | {
      type: 'enable'
      item: ListEditorItem
      state: boolean
      index: number
    }
  | {
      type: 'change'
      item: ListEditorItem
      value: string
      index: number
    }
  | {
      type: 'blur'
      index: number
      item: ListEditorItem
    }
