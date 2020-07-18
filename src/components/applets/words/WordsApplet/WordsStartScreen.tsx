import { AppletStartProps } from 'components/applets/AppletContainer'
import ControlledScrollbars from 'components/shared/ControlledScrollbars'
import PageTitle from 'components/shared/PageTitle'
import React, { useContext } from 'react'
import Title from 'components/shared/Title'
import WordsAppletContext from './context'
import WordsEditor from '../WordsEditor'
import styles from './WordsApplet.module.scss'

export default function WordsStartScreen({
  openSettings,
  startSession,
}: AppletStartProps) {
  const { title, icon, description } = useContext(WordsAppletContext)

  return (
    <ControlledScrollbars>
      <PageTitle icon={icon} label={title} />
      <div className={'px-4'}>{description}</div>
    </ControlledScrollbars>
  )
}
