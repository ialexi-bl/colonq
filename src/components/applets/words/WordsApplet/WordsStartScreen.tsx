import { AppletStartProps } from 'components/applets/AppletContainer'
import ControlledScrollbars from 'components/shared/ControlledScrollbars'
import React, { useContext } from 'react'
import Title from 'components/shared/Title'
import WordsAppletContext from './context'
import WordsEditor from '../WordsEditor'
import styles from './WordsApplet.module.scss'

export default function WordsStartScreen({
  openSettings,
  startSession,
}: AppletStartProps) {
  const { text, manager } = useContext(WordsAppletContext)

  return (
    <ControlledScrollbars>
      <div className={styles.StartScreen}>
        <Title level={2}>{text.title}</Title>
        <p>{text.help}</p>

        <WordsEditor manager={manager} />
      </div>
    </ControlledScrollbars>
  )
}
