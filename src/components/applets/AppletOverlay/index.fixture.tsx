import { AppletOverlay, OpenAppletOverlay } from './AppletOverlay'
import { useValue } from 'react-cosmos/fixture'
import React from 'react'

export default () => {
  const [open, setOpen] = useValue('open', {
    defaultValue: false as boolean,
  })

  return (
    <div style={{ color: 'white' }}>
      <OpenAppletOverlay onClick={() => setOpen(true)} title={'Open overlay'} />
      <AppletOverlay open={open} setOpen={setOpen}>
        Hi, I'm overlay
      </AppletOverlay>
    </div>
  )
}
