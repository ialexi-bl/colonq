import { TextArea } from './TextArea'
import Input from './Input'
import React from 'react'

export default (
  <div
    style={{
      display: 'grid',
      padding: '2rem',
      grid: 'repeat(6, auto) / 400px',
      gridGap: '1rem',
    }}
  >
    <Input placeholder={'Input'} />
    <Input placeholder={'Valid input'} state={'valid'} />
    <Input placeholder={'Invalid input'} state={'invalid'} />
    <TextArea placeholder={'Text area'} cols={10} rows={5} />
  </div>
)
