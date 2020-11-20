import { ComponentType } from 'react'
import { RouteComponentProps as ReactRouterComponentProps } from 'react-router'

export type Routes = {
  [path: string]: RouteOptions
}

export type RouteOptions = {
  path: string
  name: string
  authenticated?: boolean
} & {
  getKey?: (data: ReactRouterComponentProps<any>) => string
  getComponent: (
    data: ReactRouterComponentProps<any>,
  ) => Promise<{ default: RouteComponent }>
  _importStarted?: Record<string, boolean>
  _imported?: Record<string, RouteComponent>
}

export type RouteComponent = ComponentType<RouteComponentProps>
export type RouteComponentProps = {
  visible: boolean
  setProgress: (progress: number) => void
}
