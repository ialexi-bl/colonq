import { ScrollTarget } from './ScrollTarget'
import React, { createContext, useState } from 'react'
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars'

export type ControllableScrolbarsProps = Omit<ScrollbarProps, 'onScrollFrame'>
export const ScrollContext = createContext({} as ScrollTarget)

export function ControllableScrolbars({
  children,
  ...props
}: ControllableScrolbarsProps) {
  const [context] = useState(() => new ScrollTarget())

  return (
    <Scrollbars
      ref={(api) => api && (context.scrollApi = api)}
      onScrollFrame={context.onScrollFrame}
      {...props}
    >
      <ScrollContext.Provider value={context}>
        {children}
      </ScrollContext.Provider>
    </Scrollbars>
  )
}
