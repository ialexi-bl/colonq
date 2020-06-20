import {
  renderScrollThumb,
  renderScrollTrack,
} from 'components/shared/render-scroll'
import React from 'react'
import UglyScrollbars, { ScrollbarProps } from 'react-custom-scrollbars'

export function Scrollbars(props: ScrollbarProps) {
  return (
    <UglyScrollbars
      renderTrackVertical={renderScrollTrack}
      renderThumbVertical={renderScrollThumb}
      {...props}
    />
  )
}
