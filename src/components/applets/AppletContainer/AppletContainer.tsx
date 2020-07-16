import { AppletContainerProps } from './types'
import { CSSTransition } from 'react-transition-group'
import { noComponent } from 'util/noop'
import React, { useState } from 'react'
import cn from 'clsx'
import styles from './AppletContainer.module.scss'

export default function AppletContainer({
  settings: Settings = noComponent,
  session: Session,
  start: Start,
}: AppletContainerProps) {
  const [state, setState] = useState<'start' | 'settings' | 'session'>('start')

  const backToStart = () => setState('start')
  const openSettings = () => setState('settings')
  const startSession = () => setState('session')

  return (
    <div
      className={cn(styles.WordsApplet, {
        [styles.settingsOpen]: state === 'settings',
        [styles.sessionStarted]: state === 'session',
      })}
    >
      <CSSTransition
        in={state === 'session'}
        timeout={transitionDuration}
        unmountOnExit
        mountOnEnter
      >
        <Session backToStart={backToStart} />
      </CSSTransition>

      <CSSTransition
        in={state !== 'session'}
        timeout={transitionDuration}
        classNames={transitionClassName}
      >
        <div className={styles.Content}>
          <Start openSettings={openSettings} startSession={startSession} />
        </div>
      </CSSTransition>
      <CSSTransition
        in={state === 'settings'}
        timeout={transitionDuration}
        classNames={transitionClassName}
        mountOnEnter
        unmountOnExit
      >
        <div className={styles.Settings}>
          <Settings backToStart={backToStart} />
        </div>
      </CSSTransition>
    </div>
  )
}

const { transitionClassName } = styles
const transitionDuration = parseInt(styles.transitionDuration)
