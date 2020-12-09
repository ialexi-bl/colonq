import { ScrollTarget } from './ScrollTarget'
import {
  renderScrollThumb,
  renderScrollTrack,
} from 'components/shared/render-scroll'
import React, { createContext, useState } from 'react'
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars'

export type ControlledScrollbarsProps = Omit<ScrollbarProps, 'onScrollFrame'>
export const ScrollContext = createContext({} as ScrollTarget)

export default function ControlledScrollbars({
  children,
  className,
  ...props
}: ControlledScrollbarsProps) {
  const [context] = useState(() => new ScrollTarget())

  return (
    <Scrollbars
      renderTrackVertical={renderScrollTrack}
      renderThumbVertical={renderScrollThumb}
      onScrollFrame={context.onScrollFrame}
      ref={(api) => api && (context.scrollApi = api)}
      {...props}
    >
      <ScrollContext.Provider value={context}>
        {children}
      </ScrollContext.Provider>
    </Scrollbars>
  )
}
