import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars'
import { renderScrollThumb, renderScrollTrack } from '../render-scroll'
import React from 'react'
import cn from 'clsx'
import styles from './Page.module.scss'

/**
 * Provides default styles for page layout, route changing transitions
 * and custom scrollbars
 */
export const Page = ({ className, ...props }: HTMLProps.div) => (
  <div className={cn(styles.Page, className)} {...props} />
)

export const ScrollablePage = ({
  className,
  children,
  ...props
}: ScrollbarProps) => (
  <div className={cn(className, styles.Page)}>
    <Scrollbars
      autoHide
      renderThumbVertical={renderScrollThumb}
      renderTrackVertical={renderScrollTrack}
      {...props}
    >
      {children}
    </Scrollbars>
  </div>
)
