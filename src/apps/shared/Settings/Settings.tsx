import { ApiResponse } from 'services/api/config'
import { MixedDispatch } from 'store/types'
import { executeAuthorizedMethod } from 'store/user'
import { notifyErrorObject, notifyInfo } from 'store/view'
import { useDispatch } from 'react-redux'
import React, { useEffect, useRef } from 'react'
import SettingsApi from 'services/api/settings'
import ToggleList from 'components/shared/ToggleList'
import useSettingsControls, {
  ToggleListDispatch,
} from './use-settings-controls'

export type SettingsViewProps = {
  app: string
  settings: ApiResponse.Settings.Get
}

export default function Settings({
  app,
  settings: _settings,
}: SettingsViewProps) {
  const { settings, modified, resetModified } = useSettingsControls(_settings)
  const dispatch = useDispatch<MixedDispatch>()
  const save = useRef({ timer: null as null | number, func: () => {} })

  useEffect(() => {
    if (!modified) return

    async function func() {
      if (!modified) return Promise.resolve()

      try {
        await dispatch(
          executeAuthorizedMethod(SettingsApi.changeSettings(app, modified)),
        )
        resetModified()
        save.current = { timer: null, func: () => {} }
      } catch (e) {
        return dispatch(notifyErrorObject(e))
      }
    }
    function unload(e: BeforeUnloadEvent) {
      dispatch(notifyInfo('Сохраняю....'))
      func().then(() => {
        dispatch(notifyInfo('Настройки сохранены, можешь уходить'))
      })
      const message =
        'Стой, настройки не успели сохраниться! Точно хочешь выйти?'
      e.preventDefault()
      e.returnValue = message
      return message
    }

    save.current = { func, timer: window.setTimeout(func, 500) }
    // window.onbeforeunload = unload
    window.addEventListener('beforeunload', unload)
    return () => {
      clearTimeout(save.current.timer!)
      // window.onbeforeunload = null
      window.removeEventListener('beforeunload', unload)
    }
  }, [app, dispatch, modified, resetModified, settings])
  useEffect(() => {
    return () => {
      if (save.current.timer === null) return
      clearTimeout(save.current.timer)
      save.current.func()
    }
  }, [])

  return (
    <div className={'px-2'}>
      {settings.map((setting) => {
        switch (setting.type) {
          case 'list':
            return (
              <ListSetting
                key={setting.id}
                list={setting.data}
                dispatch={setting.dispatch}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}

function ListSetting({
  list,
  dispatch,
}: {
  list: ApiResponse.Settings.ToggleList
  dispatch: ToggleListDispatch
}) {
  return (
    <div className={'px-2'}>
      <h2 className={'text-2xl mb-4'}>{list.title}</h2>
      {list.description && <p className={'mb-4'}>{list.description}</p>}
      <ToggleList onToggle={dispatch} data={list.items} />
    </div>
  )
}
