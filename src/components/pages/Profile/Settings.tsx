import { AppState } from 'store/types'
import { SettingItem, SettingItemContent, SettingItemLabel } from './view'
import { disableAnimations, enableAnimations } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import NotificationsToggler from './NotificationsToggler'
import Toggle from 'components/form/Toggle'

export default function Settings() {
  return (
    <div>
      <h2 className={'text-lg text-disabled-100'}>Настройки</h2>
      <AnimationsToggler />
      <NotificationsToggler />
    </div>
  )
}

const AnimationsToggler = () => {
  const dispatch = useDispatch()
  const on = useSelector((state: AppState) => state.view.animationsEnabled)
  return (
    <SettingItem>
      <SettingItemLabel>Переходы между страницами</SettingItemLabel>
      <SettingItemContent>
        <Toggle
          checked={on}
          onChange={(on) =>
            dispatch(on ? enableAnimations() : disableAnimations())
          }
        />
      </SettingItemContent>
    </SettingItem>
  )
}
