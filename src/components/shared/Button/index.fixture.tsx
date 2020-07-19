import Button from 'components/shared/Button'
import React from 'react'

const onClick = () => alert("I'm working")
export default (
  <div
    style={{
      display: 'grid',
      padding: '2rem',
      grid: 'repeat(6, auto) / 200px',
      gridGap: '1rem',
    }}
  >
    <Button onClick={onClick}>Primary</Button>
    <Button onClick={onClick} secondary>
      Secondary
    </Button>
    <Button onClick={onClick} disabled>
      Disabled
    </Button>
  </div>
)
