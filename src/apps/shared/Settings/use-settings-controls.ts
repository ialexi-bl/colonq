import { ApiResponse } from 'services/api/config'
import { ToggleChanges, ToggleListChanges } from 'services/api/settings'
import { useCallback, useMemo, useReducer } from 'react'

type SettingsMap = Record<string, ApiResponse.Settings.Setting>

export type ToggleDispatch = (value?: boolean) => void
export type ToggleListDispatch = (data: { group: string; item: string }) => void

type DispatchMap = Record<string, ToggleDispatch | ToggleListDispatch>
export type Controls = Array<
  | {
      id: string
      type: ApiResponse.Settings.Toggle['type']
      data: ApiResponse.Settings.Toggle
      dispatch: ToggleDispatch
    }
  | {
      id: string
      type: ApiResponse.Settings.ToggleList['type']
      data: ApiResponse.Settings.ToggleList
      dispatch: ToggleListDispatch
    }
>

export default function useSettingsControls(
  settings: ApiResponse.Settings.Get,
) {
  const [data, dispatch] = useReducer(reducer, settings, getInitial)
  const controls = useMemo(() => {
    const result: DispatchMap = {}
    settings.forEach((setting) => {
      switch (setting.type) {
        case 'list':
          result[setting.id] = ({
            group,
            item,
          }: {
            group: string
            item: string
          }) => dispatch({ id: setting.id, type: 'list', group, item })
          break
        case 'toggle':
          result[setting.id] = (value?: boolean) =>
            dispatch({ id: setting.id, type: 'toggle', value })
          break
        default:
          console.warn(`Encountered setting of unknown type`, setting)
      }
    })
    return result
  }, [settings])

  return {
    settings: settings.map((setting) => ({
      id: setting.id,
      type: setting.type,
      data: data[setting.id],
      dispatch: controls[setting.id],
    })) as Controls,
    // TODO: (later) maybe refactor so that this doesn't use this hack with _modified field
    modified: (data._modified as unknown) as Record<
      string,
      ToggleChanges | ToggleListChanges
    >,
    resetModified: useCallback(() => dispatch({ type: 'reset-modified' }), []),
  }
}

const getInitial = (settings: ApiResponse.Settings.Get) => {
  const state = ({ _modified: null } as unknown) as SettingsMap
  settings.forEach((setting) => (state[setting.id] = setting))
  return state
}
const reducer = (
  state: SettingsMap,
  action:
    | { type: 'reset-modified' }
    | { id: string; type: 'list'; group: string; item: string }
    | { id: string; type: 'toggle'; value?: boolean },
) => {
  switch (action.type) {
    case 'reset-modified':
      return ({ ...state, _modified: null } as unknown) as SettingsMap
    case 'toggle': {
      const setting = state[action.id] as ApiResponse.Settings.Toggle
      const value = action.value ?? !setting.value

      return {
        ...state,
        [action.id]: {
          ...setting,
          value,
        },
        _modified: {
          ...state._modified,
          [action.id]: value,
        },
      }
    }
    case 'list': {
      const { id, group: groupId, item: itemId } = action
      const list = state[id] as ApiResponse.Settings.ToggleList

      for (let i = 0, l = list.items.length; i < l; i++) {
        const group = list.items[i]
        if (group.id !== groupId) continue

        for (let j = 0, l = group.items.length; j < l; j++) {
          const item = group.items[j]
          if (item.id !== itemId) continue

          const newGroupItems = [...group.items]
          newGroupItems[j] = {
            ...item,
            value: !item.value,
          }
          const newItems = [...list.items]
          newItems[i] = {
            ...group,
            items: newGroupItems,
          }

          const changes: Record<string, boolean> = {}
          newGroupItems.forEach((item) => (changes[item.id] = item.value))

          return {
            ...state,
            [id]: {
              ...list,
              items: newItems,
            },
            _modified: {
              ...state._modified,
              [id]: {
                ...((state._modified || {}) as any)[id],
                ...changes,
              },
            },
          }
        }
      }
    }
  }
  return state
}
