import { Help } from 'components/icons/Help'
import { More } from 'components/icons/More'
import { useValue } from 'react-cosmos/fixture'
import Overlay, { OverlayCloseButton, OverlayOpenButton } from '.'
import React from 'react'

export default {
  Buttons: () => {
    return (
      <div>
        <OverlayOpenButton icon={More} />
        <OverlayOpenButton icon={Help} />
        <OverlayCloseButton />
      </div>
    )
  },
  Overlay: () => {
    const [open, setOpen] = useValue<boolean>('open', { defaultValue: false })
    return (
      <div>
        <OverlayOpenButton onClick={() => setOpen(true)} />

        <Overlay setOpen={setOpen} open={open}>
          <h1>Hello I'm an overlay</h1>
          <OverlayCloseButton onClick={() => setOpen(false)} />
        </Overlay>
      </div>
    )
  },
}
