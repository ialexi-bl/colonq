import Close from 'components/icons/Close'
import React from 'react'
import cn from 'clsx'
import styles from './Overlay.module.scss'

/**
 * Close icon that hovers in top right corner. Supposed
 * to be used inside an overlay to close it
 * @param {OverlayCloseButtonProps} props
 */
export const OverlayCloseButton = function OverlayOpen({
  className,
  ...props
}: HTMLProps.button) {
  return (
    <button
      className={cn(styles.CloseButton, className)}
      title={'Закрыть'}
      {...props}
    >
      <Close className={styles.Icon} />
    </button>
  )
}
