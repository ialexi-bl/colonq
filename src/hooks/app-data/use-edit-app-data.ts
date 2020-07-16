import { AppData, defaultData, setAppData } from 'store/app-data'
import { AppState } from 'store/types'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AppletManager from 'services/applets/AppletManager'
import useAppData from './use-app-data'
import useUpdateAppData from './use-update-app-data'

export default function useEditAppData<TData, TStored, TAction>(
  manager: AppletManager<TData, TStored, TAction>,
) {
  const dispatchGlobally = useDispatch()
  const { scheduleBackup } = useUpdateAppData(manager)
  const { data, loading, version } = useAppData(manager)

  const [newData, setNewData] = useState<TData>(() =>
    JSON.parse(JSON.stringify(data)),
  )

  const dispatch = useCallback(
    (action: TAction) => {
      setNewData((data) => {
        const newData = manager.reduce(data, action)
        scheduleBackup(newData)

        return newData
      })
    },
    [manager, scheduleBackup],
  )
  const apply = () => {
    dispatchGlobally(
      setAppData(manager.applet, {
        data: newData,
        version: version + 1,
      }),
    )
  }

  useEffect(() => {
    if (loading && data) {
      setNewData(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return { dispatch, loading, apply, data: newData }
}
