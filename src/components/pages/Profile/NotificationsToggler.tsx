import { MixedDispatch } from 'store/types'
import { SettingItem, SettingItemContent, SettingItemLabel } from './view'
import { notifyError, notifyErrorObject } from 'store/view'
import { useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import HourSelector from 'components/shared/HourSelector'
import NotificationsController from 'services/notifications'
import Toggle from 'components/form/Toggle'
import cn from 'clsx'
import useSave from 'hooks/use-save'

export type NotificationsTogglerProps = {
  className?: string
}
export default function NotificationsToggler({
  className,
}: NotificationsTogglerProps) {
  const [hour, setHour] = useState({ current: 18, real: 18 })
  const [status, setStatus] = useState(false)
  const processing = useRef(false)
  const dispatch = useDispatch<MixedDispatch>()

  const subscribe = () => {
    if (processing.current) return
    processing.current = true

    dispatch(NotificationsController.subscribe(hour.current)).then((x) => {
      setStatus(x)
      processing.current = false
    })
  }
  const unsubscribe = async () => {
    if (processing.current) return
    processing.current = true

    dispatch(NotificationsController.unsubscribe()).then((x) => {
      setStatus(!x)
      processing.current = false
    })
  }

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    dispatch(NotificationsController.getHour()).then((hour) => {
      if (hour !== null) {
        setHour({ current: hour, real: hour })
        setStatus(true)
      } else {
        setStatus(false)
      }
    })
  }, [dispatch])

  useSave(hour.current !== hour.real, hour, async () => {
    try {
      await dispatch(NotificationsController.setHour(hour.current))
      setHour({ current: hour.current, real: hour.current })
    } catch (e) {
      dispatch(notifyErrorObject(e))
    }
  })

  const toggle = (checked: boolean) => {
    if (!('serviceWorker' in navigator)) {
      return dispatch(
        notifyError(
          'Твой браузер не поддерживает уведомления. Обнови его, чтобы получать напоминания о занятиях',
        ),
      )
    }

    if (checked) subscribe()
    else unsubscribe()
  }

  return (
    <div className={cn(className, 'mb-4')}>
      <SettingItem>
        <SettingItemLabel>Уведомления</SettingItemLabel>
        <SettingItemContent>
          <Toggle onChange={toggle} checked={status} />
        </SettingItemContent>
      </SettingItem>
      <SettingItem sub>
        <SettingItemLabel sub>Отправлять в</SettingItemLabel>
        <SettingItemContent className={'flex'}>
          <HourSelector
            disabled={!status}
            onChange={(h) => setHour({ current: h, real: hour.real })}
            value={hour.current}
          />
          <p className={'ml-2'}>часов</p>
        </SettingItemContent>
      </SettingItem>
    </div>
  )
}
