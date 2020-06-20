import {
  Overlay,
  OverlayCloseButton,
  OverlayOpenButton,
} from 'components/shared/Overlay'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars'

type SetOpen = (open: boolean) => unknown
export type AppletSettingsProps = {
  open: boolean
  setOpen: SetOpen
  children: React.ReactNode
}

/**
 * Shortcut component to create overlays in applets with
 * scrollbars and close buttons
 * @param props
 */
export const AppletOverlay = function AppletHelp({
  open,
  setOpen,
  children,
}: AppletSettingsProps) {
  return (
    <Overlay open={open} setOpen={setOpen}>
      <Scrollbars>
        <OverlayCloseButton onClick={() => setOpen(false)} />
        <div>{children}</div>
      </Scrollbars>
    </Overlay>
  )
}

export const OpenAppletOverlay = OverlayOpenButton
