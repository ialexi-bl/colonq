import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars'
import { forwardRef } from 'react'
import { renderScrollThumb, renderScrollTrack } from '../render-scroll'
import { useIsNavigationVisible } from '../Navigation'
import cn from 'clsx'
import styles from './Page.module.scss'

type ElevationProps = {
  routeElevation?: number
}
export type PageProps = HTMLProps.div & ElevationProps

const Page = ({ className, routeElevation, ...props }: PageProps) => (
  <div
    className={cn(
      styles.Page,
      // pt-16 is for navigation
      // container cannot be used here because some apps need full width blocks
      // For the same reason background is not set
      'h-full relative overflow-hidden',
      useIsNavigationVisible() && 'sm:pt-16',
      className,
    )}
    style={{ zIndex: routeElevation }}
    {...props}
  />
)
export default Page

export const ScrollablePage = forwardRef<
  Scrollbars,
  ScrollbarProps & ElevationProps
>(({ className, children, routeElevation, ...props }, ref) => (
  <Page routeElevation={routeElevation} className={className}>
    <Scrollbars
      autoHide
      renderThumbVertical={renderScrollThumb}
      renderTrackVertical={renderScrollTrack}
      ref={ref}
      {...props}
    >
      {children}
    </Scrollbars>
  </Page>
))
