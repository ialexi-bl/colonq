import { Box } from './Box'
import React from 'react'

export default (
  <div
    style={{
      color: 'white',
      padding: '10px',
      display: 'grid',
      gridGap: '10px',
      textAlign: 'justify',
      gridTemplateColumns: '400px',
    }}
  >
    <Box>I'm a box with some content</Box>
    <Box>I'm a box with lots of grapes: {'grapes 🍇🍇 '.repeat(50)}</Box>
  </div>
)
