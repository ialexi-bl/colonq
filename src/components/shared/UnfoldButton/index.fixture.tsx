import { useValue } from 'react-cosmos/fixture'
import React from 'react'
import UnfoldButton from './UnfoldButton'

export default () => {
  const [folded, setFolded] = useValue('folded', {
    defaultValue: true as boolean,
  })

  return (
    <div
      style={{
        display: 'inline-block',
        boxShadow: '0 0 0 3px rgba(0, 0, 0, .3)',
      }}
    >
      <UnfoldButton folded={folded} onClick={() => setFolded(!folded)} />
    </div>
  )
}
