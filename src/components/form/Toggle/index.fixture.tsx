import { useValue } from 'react-cosmos/fixture'
import React from 'react'
import Toggle from './Toggle'

export default () => {
  const [checked, setChecked]: any = useValue('checked', {
    defaultValue: false,
  })

  return <Toggle checked={checked} onChange={setChecked} />
}
