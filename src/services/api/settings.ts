import { ApiResponse, Endpoint } from 'services/api/config'
import Api from './api'

export type SettingsChanges = Record<string, ToggleChanges | ToggleListChanges>
export type ToggleChanges = boolean
export type ToggleListChanges = Record<string, boolean>

export default class SettingsApi {
  public static getSettings(app: string) {
    return (token: string) =>
      Api.get<ApiResponse.Settings.Get>(Endpoint.settings.get(app), {
        token,
      })
  }

  public static changeSettings(app: string, settings: SettingsChanges) {
    return (token: string) =>
      Api.post<ApiResponse.Settings.Change>(Endpoint.settings.set(app), {
        json: { settings },
        token,
      })
  }
}
