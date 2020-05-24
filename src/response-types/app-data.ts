import { ServerResponse } from 'response-types'

export type GetAppDataResponse =
  | ServerResponse<
      'not-modified' | 'outdated',
      {
        version: number
        data: null
      }
    >
  | ServerResponse<
      'ok',
      {
        version: number
        data: any
      }
    >

export type SetAppDataResponse =
  | ServerResponse<
      'ok',
      {
        status: 'ok'
        version: number
      }
    >
  | ServerResponse<
      'updated',
      {
        status: 'updated'
        version: number
        data: any
      }
    >

export type AppDataMessage = {
  applet: string
  version: number
  data: any
}
