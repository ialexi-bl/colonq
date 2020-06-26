import { CSSTransition } from 'react-transition-group'
import React, { useEffect } from 'react'
import styles from './Overlay.module.scss'

const duration = parseInt(styles.transitionDuration)
const className = styles.transitionClassName

export type OverlayProps = {
  open: boolean
  children: React.ReactNode
  setOpen: (open: boolean) => unknown
}

/**
 * Overlay that appears above page content
 * @param {OverlayProps} props
 */
export default function Overlay({ open, children, setOpen }: OverlayProps) {
  // Close overlay on escape press
  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', keyDown)
    return () => {
      window.removeEventListener('keydown', keyDown)
    }
  }, [open, setOpen])

  return (
    <CSSTransition
      classNames={className}
      timeout={duration}
      unmountOnExit
      mountOnEnter
      in={open}
    >
      <div className={styles.Container}>
        <div className={styles.Content}>{children}</div>
      </div>
    </CSSTransition>
  )
}
