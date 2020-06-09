import { Input } from '.'
import { TextArea } from './TextArea'
import React from 'react'

const wrap = (e: any) => <div style={{ width: '20rem' }}>{e}</div>
export default {
  Input: wrap(<Input />),
  'Input Invalid': wrap(<Input state={'invalid'} />),
  'Input Valid': wrap(<Input state={'valid'} />),
  Textarea: wrap(<TextArea cols={10} rows={5} />),
}
