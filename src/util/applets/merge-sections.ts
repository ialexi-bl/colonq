import {
  ListEditorLeaf,
  ListEditorSection,
} from 'components/list-editor/list-editor-types'

export function mergeSections(
  localSections: ListEditorSection[],
  externalSections: ListEditorSection[],
) {
  const sections: ListEditorSection[] = []
  const sectionIds: Record<string, true> = {}

  localSections.forEach((section) => {
    sectionIds[section.id] = true

    // Sections that have just been created on this device
    if (section.new) {
      return sections.push(section)
    }

    // If externalSection doesn't contain a section,
    // that means it has been deleted
    const external = externalSections.find((s) => s.id === section.id)
    if (external) {
      const items: ListEditorLeaf[] = []
      const itemIds: Record<string, true> = {}

      section.label = section.modified ? section.label : external.label
      section.enabled = external.enabled
      section.items.forEach((item) => {
        itemIds[item.id] = true

        if (item.new || item.modified) {
          return items.push(item)
        }

        // Item is kept if it has just been created on this device
        // or if it was not deleted in external data
        const externalItem = external.items.find((i) => i.id === item.id)
        if (externalItem) {
          items.push(externalItem)
        }
      })

      // Copying items, created on another device
      external.items.forEach((item) => {
        if (!(item.id in itemIds)) {
          items.push(item)
        }
      })

      section.items = items
      sections.push({ ...section })
    } else if (section.modified) {
      sections.push(section)
    }
  })

  // Copying sections, created on another device
  externalSections.forEach((section) => {
    if (!(section.id in sectionIds)) {
      sections.push(section)
    }
  })

  return sections
}
