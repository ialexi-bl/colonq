import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars'
import { renderScrollThumb, renderScrollTrack } from '../render-scroll'
import React, { forwardRef } from 'react'
import cn from 'clsx'
import styles from './Page.module.scss'

/**
 * Provides default styles for page layout, route changing transitions
 * and custom scrollbars
 */
const Page = ({ className, ...props }: HTMLProps.div) => (
  <div className={cn(styles.Page, className)} {...props} />
)
export default Page

export const ScrollablePage = forwardRef<Scrollbars, ScrollbarProps>(
  ({ className, children, ...props }, ref) => (
    <div className={cn('w-full h-full', className)}>
      <Scrollbars
        autoHide
        renderThumbVertical={renderScrollThumb}
        renderTrackVertical={renderScrollTrack}
        ref={ref}
        {...props}
      >
        {children}
      </Scrollbars>
    </div>
  ),
)
