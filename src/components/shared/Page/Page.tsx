import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars'
import { forwardRef } from 'react'
import { renderScrollThumb, renderScrollTrack } from '../render-scroll'
import { useIsNavigationRendered } from '../Navigation'
import cn from 'clsx'
import styles from './Page.module.scss'

type ElevationProps = {
  routeElevation?: number
}
export type PageProps = HTMLProps.div & ElevationProps

export const EmptyPage = ({
  className,
  routeElevation,
  ...props
}: PageProps) => (
  <div
    className={cn(className, styles.Page, 'h-full relative overflow-hidden')}
    style={{ zIndex: routeElevation }}
    {...props}
  />
)

const Page = ({ className, ...props }: PageProps) => (
  <EmptyPage
    className={cn(className, useIsNavigationRendered() && 'sm:pt-16')}
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
      renderTrackVertical={renderScrollTrack}
      renderThumbVertical={renderScrollThumb}
      ref={ref}
      {...props}
    >
      {children}
    </Scrollbars>
  </Page>
))
