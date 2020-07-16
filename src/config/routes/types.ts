import { RouteComponentProps } from 'react-router'

export type Routes = {
  [path: string]: RouteOptions
}

export type RouteOptions = {
  path: string
  name: string
  authenticated?: boolean
} & (
  | {
      render: (props: RouteComponentProps<any>) => React.ReactNode
    }
  | {
      component: React.ComponentType
    }
)
