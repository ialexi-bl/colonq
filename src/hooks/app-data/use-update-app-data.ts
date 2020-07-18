import { AppData, defaultData, setAppData } from 'store/app-data'
import { AppState } from 'store/types'
import { setLocalData } from './local-data'
import { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUploadAppData } from './use-remote-app-data'
import AppletManager from 'services/applets/AppletManager'

export default function useUpdateAppData<TData, TStored, TAction>(
  manager: AppletManager<TData, TStored, TAction>,
) {
  const dispatchGlobally = useDispatch()
  const { data, version } = useSelector<AppState, AppData<TData | null>>(
    (state) => state.appData[manager.applet] || defaultData,
  )

  const timeout = useRef({ backup: -1, save: -1 })
  const upload = useUploadAppData(manager)

  const scheduleBackup = useCallback(
    (data: TData) => {
      clearTimeout(timeout.current.backup)
      clearTimeout(timeout.current.save)
      timeout.current = {
        backup: window.setTimeout(() => {
          setLocalData(manager, data, version + 1)
        }, 1000),
        save: window.setTimeout(() => {
          upload(data, version + 1)
        }, 5000),
      }
    },
    [manager, upload, version],
  )
  const dispatch = useCallback(
    (action: TAction) => {
      if (!data) return
      const newData = manager.reduce(data, action)
      scheduleBackup(newData)

      dispatchGlobally(
        setAppData(manager.applet, {
          data: newData,
          version: version + 1,
        }),
      )
    },
    [data, dispatchGlobally, manager, scheduleBackup, version],
  )

  return { dispatch, scheduleBackup }
}