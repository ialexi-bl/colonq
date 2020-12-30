import { ApiResponse } from 'services/api/config'
import { MixedDispatch } from 'store/types'
import { executeAuthorizedMethod, loadApp } from 'store/user'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Config from 'config'
import SettingsApi from 'services/api/settings'

type Status = Result['status']
type Result =
  | {
      status: 'loading' | 'error' | 'retrying'
      settings: never[]
      retry: () => void
    }
  | {
      status: 'loaded'
      settings: ApiResponse.Settings.Get
      retry: () => void
    }

// TODO: (later) maybe extract this hook and useLesson to something more general
export default function useSettings(app: string): Result {
  const dispatch = useDispatch<MixedDispatch>()
  const [status, setStatus] = useState<Status>('loading')
  const [settings, setSettings] = useState<null | ApiResponse.Settings.Get>(
    null,
  )

  const load = () => {
    dispatch(executeAuthorizedMethod(SettingsApi.getSettings(app)))
      .then(({ data }) => {
        setSettings(data)
        setStatus('loaded')
      })
      .catch(async (error) => {
        if (Config.IS_DEV) console.error(error)
        setStatus('error')
      })
  }
  useEffect(load, [app, dispatch])
  useEffect(() => {
    dispatch(loadApp(app))
  }, [app, dispatch])

  return {
    status,
    settings,
    retry: () => {
      setStatus('retrying')
      load()
    },
  } as Result
}
