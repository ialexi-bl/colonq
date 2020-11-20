import React, { ComponentType } from 'react'
import useIsAuthenticated from 'hooks/use-is-authenticated'

export default function withAuth<T>(Component: ComponentType<T>) {
  return (props: T) => (useIsAuthenticated() ? <Component {...props} /> : null)
}
