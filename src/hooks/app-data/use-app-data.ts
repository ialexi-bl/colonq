import { AppData, defaultData, setAppData } from 'store/app-data'
import { AppDataManager } from 'services/applets/AppletManager'
import { AppState, MixedDispatch } from 'store/types'
import { UnknownError } from 'services/errors'
import { fetchAppData, uploadAppData } from './use-remote-app-data'
import { getLocalData } from './local-data'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export function useAppData<TData, TStored, TAction>(
  manager: AppDataManager<TData, TStored, TAction>,
  onLoad?: () => unknown,
) {
  const dispatch = useDispatch<MixedDispatch>()
  const authLoading = useSelector((state: AppState) => state.auth.loading)
  const { data, version, fetched } = useSelector<
    AppState,
    AppData<TData | null>
  >((state) => state.appData[manager.applet] || defaultData)
  const [loading, setLoading] = useState(!fetched && data === null)

  // Initial request
  useEffect(() => {
    ;(async () => {
      if (authLoading) return
      let currentVersion = version
      let currentData = data

      if (currentData === null) {
        const local = await getLocalData(manager)

        if (local) {
          dispatch(
            setAppData(manager.applet, {
              ...local,
              fetched: false,
            }),
          )
          currentVersion = local.version
          currentData = local.data
        }
      }

      const serverData = await dispatch(fetchAppData(currentVersion, manager))
      if (typeof serverData === 'object') {
        dispatch(
          setAppData(manager.applet, {
            ...serverData,
            fetched: true,
          }),
        )
      } else if (serverData === 'outdated') {
        dispatch(
          setAppData(manager.applet, {
            data: currentData,
            version: currentVersion,
            fetched: true,
          }),
        )
        dispatch(
          uploadAppData(
            manager,
            currentData,
            currentVersion,
            currentData,
            true,
          ),
        )
      } else if (serverData === 'not-modified' && !currentData) {
        throw new UnknownError(
          `Unexpected response ${serverData}, while data is ${JSON.stringify(
            data,
          )}`,
        )
      }
      // * NOTE: onLoad is not a dependency, so changing
      // * handler may cause bugs. For now handlers are only static
      onLoad?.()
      setLoading(false)
    })()

    // Requests may only be repeated when an applet is changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manager.applet, authLoading])

  return {
    loading,
    data,
  }
}
