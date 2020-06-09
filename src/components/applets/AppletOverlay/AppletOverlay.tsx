import { CSSTransition } from 'react-transition-group'
import { CleanButton } from 'components/shared/Button'
import { Close } from 'components/icons/Close'
import { cssUtil } from 'styles'
import { useOnEscape } from 'hooks/use-on-escape'
import React from 'react'
import cn from 'clsx'
import styles from './AppletOverlay.module.scss'

const transitionDuration = parseInt(styles.settingsTransitionDuration)
export type OverlayButtonProps = HTMLProps.button & {
  setOpen: (open: boolean) => unknown
}
export type OverlayCloseButtonProps = {
  setOpen: (open: boolean) => unknown
}
export type OverlayProps = {
  open: boolean
  setOpen: (open: boolean) => unknown
  children: React.ReactNode
}

export const Overlay = function Overlay({
  open,
  setOpen,
  children,
}: OverlayProps) {
  useOnEscape(() => {
    if (open) {
      setOpen(false)
    }
  }, [open, setOpen])

  return (
    <CSSTransition
      classNames={styles.settingsTransitionClassName}
      timeout={transitionDuration}
      unmountOnExit
      mountOnEnter
      in={open}
    >
      <div className={styles.Container}>{children}</div>
    </CSSTransition>
  )
}

export const overlayButtonIcon = styles.ButtonIcon
export const OverlayButton = function OverlayOpen({
  setOpen,
  className,
  ...props
}: OverlayButtonProps) {
  return (
    <CleanButton
      className={cn(
        cssUtil.routeTransitionOpacity,
        styles.OpenButton,
        className,
      )}
      onClick={() => setOpen(true)}
      {...props}
    />
  )
}

export const OverlayCloseButton = function OverlayOpen({
  setOpen,
}: OverlayCloseButtonProps) {
  return (
    <CleanButton
      onClick={() => setOpen(false)}
      className={styles.CloseButton}
      title={'Закрыть'}
    >
      <Close className={styles.ButtonIcon} />
    </CleanButton>
  )
}
