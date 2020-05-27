import { AppData, defaultData, setAppData } from 'store/app-data'
import { AppDataManager } from 'services/app-data/AppDataManager'
import { AppState } from 'store/types'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateAppData } from './use-update-app-data'

export function useEditAppData<TData, TStored, TAction>(
  manager: AppDataManager<TData, TStored, TAction>,
) {
  const dispatchGlobally = useDispatch()
  const { scheduleBackup } = useUpdateAppData(manager)
  const { data, version } = useSelector<AppState, AppData<TData | null>>(
    (state) => state.appData[manager.applet] || defaultData,
  )

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

  return { newData, dispatch, apply }
}
