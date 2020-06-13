import { Checkbox } from '.'
import { useValue } from 'react-cosmos/fixture'
import React from 'react'

export default {
  Checkbox: () => {
    const [cheked, setChecked]: any = useValue('checked', {
      defaultValue: false,
    })

    return <Checkbox checked={cheked} onChange={setChecked} />
  },
}