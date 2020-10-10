import React from 'react'
import facebook from './Facebook.png'

const Facebook = (props: Omit<HTMLProps.img, 'src' | 'alt'>) => (
  <img src={facebook} alt={'Facebook icon'} {...props} />
)
export default Facebook
