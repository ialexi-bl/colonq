import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars'
import { renderScrollThumb, renderScrollTrack } from '../render-scroll'
import Page, { ElevationProps } from './Page'

const ScrollablePage = ({
  className,
  children,
  routeElevation,
  ...props
}: ScrollbarProps & ElevationProps) => (
  <Page routeElevation={routeElevation} className={className}>
    <Scrollbars
      autoHide
      renderTrackVertical={renderScrollTrack}
      renderThumbVertical={renderScrollThumb}
      {...props}
    >
      {children}
    </Scrollbars>
  </Page>
)
export default ScrollablePage
