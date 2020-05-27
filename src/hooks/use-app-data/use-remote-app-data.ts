import { AppData, setAppData } from 'store/app-data'
import { AppDataManager } from 'services/app-data/AppDataManager'
import { Endpoints } from 'config/endpoints'
import { GetAppDataResponse, SetAppDataResponse } from 'response-types/app-data'
import { MixedDispatch, ThunkAction } from 'store/types'
import { UnknownError } from 'services/errors'
import { handleRequestError } from 'services/errors/handle-request-error'
import { setLocalData } from './local-data'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import ApiClient from 'services/client'

export function useUploadAppData<TData, TStored>(
  manager: AppDataManager<TData, TStored, any>,
) {
  const dispatch = useDispatch<MixedDispatch>()

  return useCallback(
    async (newData: TData, version: number) => {
      dispatch(uploadAppData(manager, newData, version))
    },
    [dispatch, manager],
  )
}

export function fetchAppData<TData, TStored>(
  currentVersion: number | null,
  manager: AppDataManager<TData, TStored, any>,
): ThunkAction<Promise<AppData<TData> | 'not-modified' | 'outdated' | void>> {
  return async (dispatch) => {
    try {
      const response = await ApiClient.get<GetAppDataResponse>(
        Endpoints.AppData.getterOf(manager.applet),
        {
          authenticate: 'optionally',
          searchParams: {
            version: currentVersion ?? '',
          },
        },
      )

      const { version, data } = response.data
      if (response.status === 'ok') {
        setLocalData(manager, data, version, true)
        return {
          version,
          fetched: true,
          data: manager.formatForClient(data),
        }
      }
      if (response.status === 'not-modified') {
        return 'not-modified'
      }
      if (response.status === 'outdated') {
        return 'outdated'
      }

      throw new UnknownError()
    } catch (e) {
      dispatch(handleRequestError(e))
      if (manager.defaultData) {
        return {
          version: currentVersion || 0,
          fetched: false,
          data: manager.formatForClient(manager.defaultData),
        }
      }
    }
  }
}

export function uploadAppData<TData, TStored>(
  manager: AppDataManager<TData, TStored, any>,
  newData: TData,
  version: number,
  _data?: TData,
  force?: boolean,
): ThunkAction {
  return async (dispatch, getStore) => {
    const store = getStore()
    if (!store.auth.authenticated) return

    const data = _data || store.appData[manager.applet]?.data
    if (typeof data === 'undefined') {
      throw new UnknownError(
        'Attempted to modify data that has not been fetched',
      )
    }

    const uploadData = manager.getUploadData(newData, force)
    if (!uploadData) return

    try {
      const response = await ApiClient.post<SetAppDataResponse>(
        Endpoints.AppData.setterOf(manager.applet),
        {
          authenticate: true,
          json: {
            version,
            data: uploadData,
          },
        },
      )

      if (response.status === 'ok') {
        // TODO: check if setting data is necessary
        // dispatch(
        //   setAppData(manager.applet, {
        //     fetched: true,
        //     version: response.data.version,
        //     data: manager.cleanup(data),
        //   }),
        // )
      } else if (response.status === 'updated') {
        const newData = {
          fetched: true,
          version: response.data.version,
          data: manager.formatForClient(response.data.data),
        }
        dispatch(setAppData(manager.applet, newData))
      } else {
        throw new UnknownError()
      }
    } catch (e) {
      dispatch(handleRequestError(e))
    }
  }
}
