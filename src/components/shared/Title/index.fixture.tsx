import { Title } from './Title'
import { useValue } from 'react-cosmos/fixture'
import React from 'react'

export default () => {
  const [border] = useValue('margin border', { defaultValue: false })
  const style = !border
    ? {}
    : {
        // Disable margin collapsing
        display: 'inline-block',
        width: '100%',
        boxShadow: 'inset 0 0 0 1px white',
      }

  return (
    <div style={{ padding: 10, color: '#ddd' }}>
      <div style={style}>
        <Title level={1}>I'm title level 1</Title>
      </div>
      <div style={style}>
        <Title level={2}>I'm title level 2</Title>
      </div>
      <div style={style}>
        <Title level={3}>I'm title level 3</Title>
      </div>
      <div style={style}>
        <Title level={4}>I'm title level 4</Title>
      </div>
      <div style={style}>
        <Title level={5}>I'm title level 5</Title>
      </div>
      <div style={style}>
        <Title level={6}>I'm title level 6</Title>
      </div>
    </div>
  )
}
