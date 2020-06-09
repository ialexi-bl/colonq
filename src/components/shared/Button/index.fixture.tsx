import { Button } from '.'
import { CleanButton } from './CleanButton'
import React from 'react'

const onClick = () => alert("I'm working")
export default {
  'Clean Button': <CleanButton onClick={onClick}>Hello</CleanButton>,
  'Button Error': (
    <Button onClick={onClick} color={'error'}>
      Hello
    </Button>
  ),
  'Button Primary': (
    <Button onClick={onClick} color={'primary'}>
      Hello
    </Button>
  ),
  'Button Neutral': (
    <Button onClick={onClick} color={'neutral'}>
      Hello
    </Button>
  ),
  'Button Incorrect': (
    <Button onClick={onClick} color={'error'}>
      Hello
    </Button>
  ),
  'Button Disabled': (
    <Button onClick={onClick} disabled>
      Hello
    </Button>
  ),
}
