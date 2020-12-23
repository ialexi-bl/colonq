import { MixedDispatch } from 'store/types'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import HourSelector from 'components/shared/HourSelector'
import NotificationsController from 'services/notifications'
import Toggle from 'components/form/Toggle'
import cn from 'clsx'

export type NotificationsTogglerProps = {
  className?: string
}
export default function NotificationsToggler({
  className,
}: NotificationsTogglerProps) {
  const [status, setStatus] = useState<'none' | 'unavailable' | boolean>('none')
  const [hour, setHour] = useState(18)
  const dispatch = useDispatch<MixedDispatch>()

  const subscribe = () => {
    dispatch(NotificationsController.subscribe()).then(setStatus)
  }
  const unsubscribe = async () => {
    dispatch(NotificationsController.unsubscribe()).then((x) => setStatus(!x))
  }

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      setStatus('unavailable')
      return
    }

    // Show toggle only if service worker is registered
    dispatch(NotificationsController.getHour()).then((hour) => {
      if (hour) {
        setHour(hour)
        setStatus(true)
      } else {
        setStatus(false)
      }
    })
  }, [dispatch])

  if (status === 'none') return null
  if (status === 'unavailable') {
    return (
      <div className={className}>
        Твой браузер не поддерживает уведомления. Обнови его, чтобы получать
        напоминания о занятиях
      </div>
    )
  }

  return (
    <div>
      <div className={cn(className, 'flex py-4')}>
        <p className={'flex-1 text-lg'}>Уведомления</p>
        <Toggle
          onChange={(checked) => (checked ? subscribe() : unsubscribe())}
          checked={status}
        />
      </div>
      <div className={cn(className, 'flex py-4')}>
        <p className={'flex-1 text-lg'}>Уведомления</p>
        <HourSelector onChange={setHour} value={hour} />
      </div>
    </div>
  )
}
