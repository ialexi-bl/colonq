import { useValue } from 'react-cosmos/fixture'
import Checkbox from './Checkbox'
import React from 'react'

export default () => {
  const [checked, setChecked]: any = useValue('checked', {
    defaultValue: false,
  })

  return <Checkbox checked={checked} onChange={setChecked} />
}
