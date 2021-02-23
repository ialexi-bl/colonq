import { Api } from 'core/api/config'
import { MixedDispatch } from 'store/types'
import { loadApp } from 'store/user'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Config from 'config'
import SettingsService from 'core/api/services/settings'

type Status = Result['status']
type Result =
  | {
      status: 'loading' | 'error' | 'retrying'
      settings: never[]
      retry: () => void
    }
  | {
      status: 'loaded'
      settings: Api.Settings.Get
      retry: () => void
    }

// TODO: (later) maybe extract this hook and useLesson to something more general
export default function useSettings(app: string): Result {
  const dispatch = useDispatch<MixedDispatch>()
  const [status, setStatus] = useState<Status>('loading')
  const [settings, setSettings] = useState<null | Api.Settings.Get>(null)

  const load = () => {
    SettingsService.getSettings(app)
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
