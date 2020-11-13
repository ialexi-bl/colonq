import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars'
import { renderScrollThumb, renderScrollTrack } from '../render-scroll'
import React, { forwardRef } from 'react'
import cn from 'clsx'
import styles from './Page.module.scss'

type ElevationProps = {
  routeElevation?: number
}
export type PageProps = HTMLProps.div & ElevationProps

const Page = ({ className, routeElevation, ...props }: PageProps) => (
  <div
    className={cn(styles.Page, className)}
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
