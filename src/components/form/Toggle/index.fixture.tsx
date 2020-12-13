import { useValue } from 'react-cosmos/fixture'
import Toggle from './Toggle'

export default () => {
  const [checked, setChecked]: any = useValue('checked', {
    defaultValue: false,
  })

  return <Toggle checked={checked} onChange={setChecked} />
}
