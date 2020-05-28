import { AppletSettingsContext, ScrollListener } from './context'
import { More } from 'components/icons/More'
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
import React, { useCallback, useRef, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import styles from './AppletSettings.module.scss'

export type AppletSettingsProps = {
  open: boolean
  setOpen: (open: boolean) => unknown
  children: React.ReactNode
}

/**
 * Displays settings button in the corner of the page that
 * leads to the settings screen which takes all available space.
 * It provides context that is used to listen for close event and
 * scrollable container reference to manage scroll
 * @param props
 */
export const AppletSettings = function AppletSettings({
  open,
  setOpen,
  children,
}: AppletSettingsProps) {
  const [scrollListener, setListener] = useState<ScrollListener>(() => {})
  const scrollApi = useRef<Scrollbars | null>(null)
  const setScrollListener = useCallback((fn: ScrollListener) => {
    setListener(() => fn)
  }, [])

  return (
    <>
      <OverlayButton
        className={styles.OpenButton}
        setOpen={setOpen}
        title={'Настройки'}
      >
        <More className={overlayButtonIcon} />
      </OverlayButton>
      <Overlay open={open} setOpen={setOpen}>
        <AppletSettingsContext.Provider value={setScrollListener}>
          <Scrollbars
            renderTrackVertical={renderScrollTrack}
            renderThumbVertical={renderScrollThumb}
            onScrollFrame={scrollListener}
            ref={(e) => (scrollApi.current = e || scrollApi.current)}
          >
            <OverlayCloseButton setOpen={setOpen} />
            <div className={styles.Content}>{children}</div>
          </Scrollbars>
        </AppletSettingsContext.Provider>
      </Overlay>
    </>
  )
}
