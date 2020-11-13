import { ComponentType, ReactNode } from 'react'
import useIsAuthenticated from 'hooks/use-is-authenticated'

const EnsureAuthenticated: ComponentType<{ children?: ReactNode }> = ({
  children,
}) => (useIsAuthenticated() ? (children as any) : null)

export default EnsureAuthenticated
