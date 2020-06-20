export type AppsMap = {
  [key: string]: Section
}

type SectionCommons = {
  location: string
  title: string
  parent: null | string
}
export type Section = ParentSection | LeafSection
export type ParentSection = SectionCommons & {
  leaf: false
  items: string[]
}
export type LeafSection = SectionCommons & {
  leaf: true
  parent: string
  component: null | React.ComponentType
  loadComponent: () => Promise<React.ComponentType>
}
