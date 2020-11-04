import {
  AppletSessionProps,
  AppletSettingsProps,
  AppletStartProps,
} from './types'
import AppletContainer from './AppletContainer'
import Button from 'components/shared/Button'
import React from 'react'

export default () => {
  return <AppletContainer start={Start} session={Session} settings={Settings} />
}

function Start({ openSettings, startSession }: AppletStartProps) {
  return (
    <div style={style}>
      <h1>Hello I'm content</h1>
      <Button style={buttonStyle} onClick={openSettings}>
        Open settings
      </Button>
      <Button onClick={startSession}>Start session</Button>
    </div>
  )
}
function Settings({ backToStart }: AppletSettingsProps) {
  return (
    <div style={style}>
      <h1>Settings</h1>
      <Button style={buttonStyle} onClick={backToStart}>
        Back
      </Button>
    </div>
  )
}
function Session({ backToStart }: AppletSessionProps) {
  return (
    <div style={style}>
      <h1>Session is started</h1>
      <Button onClick={backToStart}>Back</Button>
    </div>
  )
}

const style = {
  background: 'var(--primary)',
  padding: '10px 30px',
  margin: 0,
}
const buttonStyle = {
  marginBottom: '1rem',
  display: 'block',
}
