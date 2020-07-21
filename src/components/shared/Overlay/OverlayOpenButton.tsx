import More from 'components/icons/More'
import React from 'react'
import cn from 'clsx'
import styles from './Overlay.module.scss'

type IconComponent = React.ComponentType<{
  className?: string
}>

export type OverlayOpenButtonProps = HTMLProps.button & {
  icon?: IconComponent
}

/**
 * Button that by default appears in top right corner of the screen
 * to open an overlay
 * @param {OverlayOpenButtonProps} props
 */
export const OverlayOpenButton = function OverlayOpen({
  icon: Icon = More,
  className,
  ...props
}: OverlayOpenButtonProps) {
  return (
    <button className={cn(styles.OpenButton, className)} {...props}>
      <Icon className={styles.Icon} />
    </button>
  )
}
