import { Api, ApiPromise, Endpoint } from 'core/api/config'
import ApiService from './api'

export type SettingsChanges = Record<string, ToggleChanges | ToggleListChanges>
export type ToggleChanges = boolean
export type ToggleListChanges = Record<string, boolean>

function getSettings(app: string): ApiPromise<Api.Settings.Get> {
  return ApiService.get<Api.Settings.Get>(Endpoint.settings.get(app))
}

function changeSettings(
  app: string,
  settings: SettingsChanges,
): ApiPromise<Api.Settings.Change> {
  return ApiService.post<Api.Settings.Change>(Endpoint.settings.set(app), {
    json: { settings },
  })
}

const SettingsService = { getSettings, changeSettings }
export default SettingsService
