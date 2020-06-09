import { Button } from '.'
import { CleanButton } from './CleanButton'
import React from 'react'

const onClick = () => alert("I'm working")
export default {
  'Clean Button': <CleanButton onClick={onClick}>Hello</CleanButton>,
  Button: (
    <div
      style={{
        display: 'grid',
        grid: 'repeat(6, auto) / 200px',
        gridGap: '10px',
      }}
    >
      <Button onClick={onClick} color={'primary'}>
        Primary
      </Button>
      <Button onClick={onClick} color={'neutral'}>
        Neutral
      </Button>
      <Button onClick={onClick} color={'error'}>
        Error
      </Button>
      <Button onClick={onClick} disabled>
        Disabled
      </Button>
    </div>
  ),
}
