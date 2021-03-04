import { Api } from 'core/api/config'
import { ToggleChanges, ToggleListChanges } from 'core/api/services/settings'
import { useCallback, useMemo, useReducer } from 'react'

type SettingsMap = Record<string, Api.Settings.Setting>
type SettingsAction =
  | { type: 'reset-modified' }
  | { id: string; type: 'stages'; problem: string; stage: string; set: string }
  | { id: string; type: 'toggle'; value?: boolean }

export type ToggleDispatch = (value?: boolean) => void
export type StagesControlsDispatch = (data: {
  problem: string
  stage: string
  set: string
}) => void

type DispatchMap = Record<string, ToggleDispatch | StagesControlsDispatch>
export type Controls = Array<
  | {
      id: string
      type: Api.Settings.Toggle['type']
      data: Api.Settings.Toggle
      dispatch: ToggleDispatch
    }
  | {
      id: string
      type: Api.Settings.StagesControls['type']
      data: Api.Settings.StagesControls
      dispatch: StagesControlsDispatch
    }
>

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useSettingsControls(settings: Api.Settings.Get) {
  const [data, dispatch] = useReducer(reducer, settings, getInitial)
  const controls = useMemo(() => {
    const result: DispatchMap = {}
    settings.forEach((setting) => {
      switch (setting.type) {
        case 'stages':
          result[setting.id] = (data: {
            problem: string
            stage: string
            set: string
          }) => dispatch({ id: setting.id, type: 'stages', ...data })
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
    modified: (data._modified as unknown) as null | Record<
      string,
      ToggleChanges | ToggleListChanges
    >,
    resetModified: useCallback(() => dispatch({ type: 'reset-modified' }), []),
  }
}

const getInitial = (settings: Api.Settings.Get) => {
  const state = ({ _modified: null } as unknown) as SettingsMap
  settings.forEach((setting) => (state[setting.id] = setting))
  return state
}
const reducer = (state: SettingsMap, action: SettingsAction) => {
  switch (action.type) {
    case 'reset-modified':
      return ({ ...state, _modified: null } as unknown) as SettingsMap
    case 'toggle': {
      const setting = state[action.id] as Api.Settings.Toggle
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
    case 'stages': {
      const { id, stage: stageId, set: setId, problem: problemId } = action
      const controls = state[id] as Api.Settings.StagesControls

      for (let i = 0, l = controls.items.length; i < l; i++) {
        const stage = controls.items[i]
        if (stage.id !== stageId) continue

        for (let j = 0, l = stage.sets.length; j < l; j++) {
          const set = stage.sets[j]
          if (set.id !== setId) continue

          for (let k = 0, l = set.problems.length; k < l; k++) {
            const problem = set.problems[k]
            if (problem.id !== problemId) continue

            const newProblems = set.problems.slice()
            newProblems[k] = {
              ...problem,
              enabled: !problem.enabled,
            }

            const newSets = stage.sets.slice()
            newSets[j] = { ...set, problems: newProblems }

            const newItems = controls.items.slice()
            newItems[i] = { ...stage, sets: newSets }

            const changes: Record<string, boolean> = {}
            newProblems.forEach(
              (problem) => (changes[problem.id] = problem.enabled),
            )

            return {
              ...state,
              [id]: {
                ...controls,
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
  }
  return state
}
