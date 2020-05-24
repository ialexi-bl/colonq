import { AppletSettingsContext, ScrollListener } from './context'
import { CSSTransition } from 'react-transition-group'
import { CleanButton } from 'components/shared/Button'
import { Close } from 'components/icons/Close'
import { More } from 'components/icons/More'
import {
  renderScrollThumb,
  renderScrollTrack,
} from 'components/shared/render-scroll'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import styles from './AppletSettings.module.scss'

const transitionDuration = parseInt(styles.settingsTransitionDuration)
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

  useEffect(() => {
    if (open) {
      const keyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false)
        }
      }

      window.addEventListener('keydown', keyDown)
      return () => {
        window.removeEventListener('keydown', keyDown)
      }
    }
  }, [setOpen, open])

  return (
    <>
      <CleanButton
        className={styles.OpenButton}
        onClick={() => setOpen(true)}
        title={'Настройки'}
      >
        <More className={styles.ButtonIcon} />
      </CleanButton>

      <AppletSettingsContext.Provider value={setScrollListener}>
        <CSSTransition
          classNames={styles.settingsTransitionClassName}
          timeout={transitionDuration}
          in={open}
          unmountOnExit
          mountOnEnter
        >
          <Scrollbars
            renderTrackVertical={renderScrollTrack}
            renderThumbVertical={renderScrollThumb}
            onScrollFrame={scrollListener}
            className={styles.Container}
            ref={(e) => (scrollApi.current = e || scrollApi.current)}
          >
            <CleanButton
              onClick={() => setOpen(false)}
              className={styles.CloseButton}
              title={'Закрыть'}
            >
              <Close className={styles.ButtonIcon} />
            </CleanButton>
            <div className={styles.Content}>{children}</div>
          </Scrollbars>
        </CSSTransition>
      </AppletSettingsContext.Provider>
    </>
  )
}
