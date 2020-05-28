import { Help } from 'components/icons/Help'
import {
  Overlay,
  OverlayButton,
  OverlayCloseButton,
  overlayButtonIcon,
} from '../AppletOverlay'
import {
  renderScrollThumb,
  renderScrollTrack,
} from 'components/shared/render-scroll'
import { useOnEscape } from 'hooks/use-on-escape'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import styles from './AppletHelp.module.scss'

export type AppletSettingsProps = {
  open: boolean
  setOpen: (open: boolean) => unknown
  children: React.ReactNode
}

export const AppletHelp = function AppletHelp({
  open,
  setOpen,
  children,
}: AppletSettingsProps) {
  useOnEscape(() => {
    if (open) {
      setOpen(false)
    }
  }, [open, setOpen])

  return (
    <>
      <OverlayButton
        className={styles.OpenButton}
        setOpen={setOpen}
        title={'Настройки'}
      >
        <Help className={overlayButtonIcon} />
      </OverlayButton>
      <Overlay open={open} setOpen={setOpen}>
        <Scrollbars
          renderTrackVertical={renderScrollTrack}
          renderThumbVertical={renderScrollThumb}
        >
          <OverlayCloseButton setOpen={setOpen} />
          <div className={styles.Content}>{children}</div>
        </Scrollbars>
      </Overlay>
    </>
  )
}
