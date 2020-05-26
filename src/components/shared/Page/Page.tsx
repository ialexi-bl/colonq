import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars'
import { renderScrollThumb, renderScrollTrack } from '../render-scroll'
import React from 'react'
import cn from 'clsx'
import styles from './Page.module.scss'
/**
 * Container that provides styles and classNames for page
 * transitions
 * @param props
 */
export const Page = ({ className, children, ...props }: ScrollbarProps) => (
  <div className={cn(className, styles.Page)}>
    <Scrollbars
      renderThumbVertical={renderScrollThumb}
      renderTrackVertical={renderScrollTrack}
      {...props}
    >
      {children}
    </Scrollbars>
  </div>
)
