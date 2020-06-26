import {
  renderScrollThumb,
  renderScrollTrack,
} from 'components/shared/render-scroll'
import React from 'react'
import UglyScrollbars, { ScrollbarProps } from 'react-custom-scrollbars'

const Scrollbars = (props: ScrollbarProps) => (
  <UglyScrollbars
    renderTrackVertical={renderScrollTrack}
    renderThumbVertical={renderScrollThumb}
    {...props}
  />
)
export default Scrollbars
